import { useAuthStore } from "@/stores/auth-store";

export const getAccessToken = (): string | null => {
  return useAuthStore.getState().accessToken;
};

export const setAccessToken = (token: string) => {
  useAuthStore.getState().setAccessToken(token);
};

export const removeAccessToken = () => {
  useAuthStore.setState({
    accessToken: null,
    isAuthenticated: false,
    user: null,
  });
};

// NOTE: refreshToken을 쿠키에 저장하는 함수
const setRefreshTokenToCookie = (token: string) => {
  if (typeof document === "undefined") return;

  document.cookie = `refreshToken=${token}; path=/; max-age=${
    28 * 24 * 60 * 60
  }; secure=${process.env.NODE_ENV === "production"}; samesite=strict`;
};

// NOTE: refreshToken을 쿠키에서 제거하는 함수
const removeRefreshTokenFromCookie = () => {
  if (typeof document === "undefined") return;

  document.cookie = "refreshToken=; path=/;";
};

const getRefreshTokenFromCookie = (): string | null => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  console.log(cookies);
  const refreshTokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("refreshToken=")
  );

  if (refreshTokenCookie) {
    return refreshTokenCookie.split("=")[1];
  }

  return null;
};

// NOTE: 토큰 갱신
export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const refreshToken = getRefreshTokenFromCookie();

    if (!refreshToken) {
      console.error("Refresh Token이 쿠키에 없습니다.");
      return null;
    }

    const response = await fetch(`${apiUrl}/v1/admin/reissue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error("토큰 갱신 실패");
    }

    const { data } = await response.json();
    console.log(data);

    if (data.accessToken) {
      setAccessToken(data.accessToken);

      if (data.refreshToken) {
        setRefreshTokenToCookie(data.refreshToken);
      }

      return data.accessToken;
    }

    return null;
  } catch (error) {
    console.error("토큰 갱신 중 오류:", error);
    return null;
  }
};

// NOTE: 로그아웃 시 모든 토큰 제거
export const logout = () => {
  removeAccessToken();
  removeRefreshTokenFromCookie();
};

// NOTE: 자동 토큰 갱신 초기화
export const initializeAuth = async (): Promise<boolean> => {
  try {
    const currentToken = getAccessToken();
    if (currentToken) {
      console.log("이미 유효한 토큰이 있습니다.");
      return true;
    }

    const refreshToken = getRefreshTokenFromCookie();
    console.log(refreshToken);
    if (!refreshToken) {
      console.log("Refresh Token이 없습니다. 로그인이 필요합니다.");
      return false;
    }

    const newToken = await refreshAccessToken();
    if (newToken) {
      console.log("토큰 자동 갱신 성공!");
      return true;
    } else {
      console.log("토큰 갱신 실패. 로그인이 필요합니다.");
      return false;
    }
  } catch (error) {
    console.error("자동 토큰 갱신 중 오류:", error);
    return false;
  }
};

export const apiRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  // NOTE: 401 에러 시 토큰 갱신 후 재시도
  if (response.status === 401) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${newToken}`,
      };

      return fetch(url, {
        ...options,
        headers: retryHeaders,
        credentials: "include",
      });
    }
  }

  return response;
};
