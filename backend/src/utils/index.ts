export const PACKAGES = {
  lite: {
    credits: 5,
    price: 10,
    name: "Lite Package",
    paddleProductId: "pri_01jz5ack9eh12hnsmqbnfhat4b",
  },
  pro: {
    credits: 100,
    price: 125,
    name: "Pro Package",
    paddleProductId: "pri_01jz5adr3bx5m9dw56jcj4h2p3",
  },
};

export type PackageType = keyof typeof PACKAGES;

export const validatePackage = (packageName: string): PackageType => {
  if (!Object.keys(PACKAGES).includes(packageName)) {
    throw new Error("Package not found");
  }
  return packageName as PackageType;
};

export const getWebhookHost = (): string | null => {
  return process.env.RAILWAY_PUBLIC_DOMAIN
    ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
    : process.env.FLY_APP_NAME
      ? `https://${process.env.FLY_APP_NAME}.fly.dev`
      : process.env.WEBHOOK_HOST || null;
};
