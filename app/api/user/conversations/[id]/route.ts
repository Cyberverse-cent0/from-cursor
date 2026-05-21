import { proxyAdminRequest } from "@/components/api/client";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyAdminRequest(request, `/api/user/conversations/${id}`);
}
