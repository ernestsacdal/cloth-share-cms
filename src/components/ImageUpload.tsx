'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2, Camera } from 'lucide-react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';

interface ImageUploadProps {
    maxFiles?: number;
    onUploadComplete: (urls: string[]) => void;
    existingImages?: string[];
}

export default function ImageUpload({
    maxFiles = 5,
    onUploadComplete,
    existingImages = [],
}: ImageUploadProps) {
    const [images, setImages] = useState<string[]>(existingImages);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        if (files.length === 0) return;

        if (images.length + files.length > maxFiles) {
            setError(`Maximum ${maxFiles} images allowed`);
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('files', file);
            });

            const response = await fetch('/api/upload/multiple', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            const newImages = [...images, ...data.urls];
            setImages(newImages);
            onUploadComplete(newImages);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            setIsUploading(false);
        }

        // Reset input
        e.target.value = '';
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        onUploadComplete(newImages);
    };

    return (
        <div className="space-y-4">
            {images.length > 0 && (
                <div>
                    <Label className="text-base font-medium">Uploaded Photos ({images.length}/{maxFiles})</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {images.map((url, index) => (
                            <div key={index} className="relative group">
                                <div className="aspect-square relative overflow-hidden rounded-lg border-2 border-border">
                                    <Image
                                        src={url}
                                        alt={`Upload ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="destructive"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                                    onClick={() => removeImage(index)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {images.length < maxFiles && (
                <div className="text-center">
                    <div className="border-2 border-dashed border-border rounded-lg p-12 hover:border-accent transition-colors">
                        {isUploading ? (
                            <div className="flex flex-col items-center gap-4">
                                <Loader2 className="h-12 w-12 text-muted-foreground animate-spin" />
                                <p className="text-muted-foreground">Uploading images...</p>
                            </div>
                        ) : (
                            <>
                                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-2">Upload Photos</h3>
                                <p className="text-muted-foreground mb-4">
                                    Add at least 1 photo (maximum {maxFiles} photos)
                                </p>
                                <label htmlFor="file-upload">
                                    <Button type="button" onClick={() => document.getElementById('file-upload')?.click()}>
                                        <Camera className="h-4 w-4 mr-2" />
                                        Choose Photos
                                    </Button>
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    disabled={isUploading}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}

            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}

            <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Photo Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Take photos in good lighting</li>
                    <li>• Show the item from multiple angles</li>
                    <li>• Include close-ups of any details or flaws</li>
                    <li>• Use a clean, uncluttered background</li>
                </ul>
            </div>
        </div>
    );
}
