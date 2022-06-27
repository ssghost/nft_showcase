type NftResult = {
  status: "error" | "loading" | "done"
  loading: boolean
  reload: () => void
  error?: Error
  nft?: {
    description: string
    image: string
    imageType: "image" | "video" | "unknown"
    name: string
    owner: string
    metadataUrl?: string
    rawData: Record<string, unknown> | null
  }
};

export type { NftResult };