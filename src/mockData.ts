export interface File {
    name: string;
    type: 'file' | 'folder';
    content?: string;
    children?: File[];
    isImage?: boolean;
}

export const mockData: File[] = [
    {
        name: "Documents",
        type: "folder",
        children: [
            {
                name: "Romeo and Juliet.txt",
                type: "file",
                content: "/files/romeo-and-juliet.txt",
            },
            {
                name: "Alice in Wonderland.txt",
                type: "file",
                content: "/files/alice-in-wonderland.txt",
            },
        ],
    },
    {
        name: "Images",
        type: "folder",
        children: [
            {
                name: "Nature",
                type: "file",
                content: "https://t3.ftcdn.net/jpg/02/70/35/00/360_F_270350073_WO6yQAdptEnAhYKM5GuA9035wbRnVJSr.jpg",
                isImage: true,
            },
            {
                name: "City",
                type: "file",
                content: "https://cdn.thezebra.com/zfront/media/production/images/hero-sustainable-cities-new-york-.width-1500.format-jpeg.jpg",
                isImage: true,
            },
            {
                name: "Animal",
                type: "file",
                content: "https://www.womansworld.com/wp-content/uploads/2024/08/cute-cats.jpg?w=953",
                isImage: true,
            },
        ],
    },
];
