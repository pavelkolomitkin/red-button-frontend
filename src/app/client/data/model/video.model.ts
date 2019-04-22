
export interface Video {
    id ?: number,
    title: string,
    metaData ?: {
        author_url ?: string,
        height ?: number,
        html ?: string,
        provider_name ?: string, // "YouTube"
        provider_url ?: string,
        thumbnail_height ?: number,
        thumbnail_url ?: string,
        thumbnail_width ?: number,
        title ?: string,
        type ?: string, // "video"
        version ?: string, // "1.0"
        width ?: number
    } ,
    externalId: string,
    originalLink: string
}
