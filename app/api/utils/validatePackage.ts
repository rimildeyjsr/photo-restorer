import { PACKAGES } from "@/api/constants/package";
import { PackageType } from "@/api/types/types";

export function validatePackage(packageName: string): PackageType {
  if (!Object.keys(PACKAGES).includes(packageName)) {
    throw new Error("Package not found");
  }
  return packageName as PackageType;
}
