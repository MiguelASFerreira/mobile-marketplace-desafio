import { api } from "@lib/api";

type UploadAttachmentResponse = {
  attachments: Array<{
    id: string;
    url: string;
  }>;
};

export async function uploadFile(file: {
  uri: string;
  name: string;
  type: string;
}) {
  const formData = new FormData();
  formData.append("files", {
    uri: file.uri,
    name: file.name,
    type: file.type,
  } as any);

  const response = await api.post<UploadAttachmentResponse>("/attachments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


  return response.data;
}
