import React, { useState } from 'react';
import { mockData } from './mockData';
import './App.css';

interface File {
    name: string;
    type: 'file' | 'folder';
    content?: string;
    children?: File[];
    isImage?: boolean;
}

const FileExplorer: React.FC = () => {
    const [activeFolder, setActiveFolder] = useState<File | null>(null);
    const [activeFileContent, setActiveFileContent] = useState<string | null>(
        null
    );
    const [isImage, setIsImage] = useState<boolean>(false);

    const handleFolderClick = (folder: File) => {
        setActiveFolder(activeFolder === folder ? null : folder);
        setActiveFileContent(null);
    };

    const handleFileClick = async (file: File) => {
        if (file.type === 'file' && file.content) {
            if (file.isImage) {
                // Якщо це зображення, встановлюємо URL
                setActiveFileContent(file.content);
                setIsImage(true);
            } else {
                // Якщо це текстовий файл, завантажуємо його вміст
                try {
                    const response = await fetch(file.content);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const text = await response.text();
                    setActiveFileContent(text);
                    setIsImage(false);
                } catch (error) {
                    console.error('Error loading file:', error);
                    setActiveFileContent('Error loading file');
                }
            }
        }
    };

    return (
        <div className="file-explorer">
            <div className="folder-pane">
                <h3>Folders</h3>
                <ul>
                    {mockData.map((folder) => (
                        <li key={folder.name}>
                            <div
                                className={`folder ${
                                    activeFolder === folder ? 'active' : ''
                                }`}
                                onDoubleClick={() => handleFolderClick(folder)}
                            >
                                {folder.name}
                            </div>
                            {activeFolder === folder && (
                                <ul className="file-list">
                                    {folder.children?.map((file) => (
                                        <li key={file.name}>
                                            <div
                                                className="file"
                                                onDoubleClick={() => handleFileClick(file)}
                                            >
                                                {file.name}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="file-view-pane">
                <h3>File Viewer</h3>
                {activeFileContent ? (
                    isImage ? (
                        <img
                            src={activeFileContent}
                            alt="File Content"
                            className="file-content"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    ) : (
                        <pre className="file-content">{activeFileContent}</pre>
                    )
                ) : (
                    <div className="no-file">No file selected</div>
                )}
            </div>
        </div>
    );
};

export default FileExplorer;
