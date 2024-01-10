const dev = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
  CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
  DEVELOPER_KEY: import.meta.env.VITE_DEVELOPER_KYE
}

const prod = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
  CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
  DEVELOPER_KEY: import.meta.env.VITE_DEVELOPER_KYE
};

const test = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
  CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
  DEVELOPER_KEY: import.meta.env.VITE_DEVELOPER_KYE
};

const getEnv = () => {
  switch (import.meta.env.VITE_NODE_ENV) {
    case "development":
      return dev
    case "production":
      return prod
    case "test":
      return test
    default:
      break;
  }
}

export const env = getEnv();
