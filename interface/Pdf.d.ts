export interface IPdf {
    id: number,
    id_lesstion_chapter: string,
    id_pdf: string,
    slug: string,
    pdf_file: string 
}

export interface IPdfPayload{
    status: boolean;
    message: string;
    data: {
      pdfs: IPdf[];
    };
}