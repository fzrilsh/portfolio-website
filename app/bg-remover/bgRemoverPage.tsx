"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { AnimatePresence, motion } from "framer-motion"
import { Download, Loader2, Menu, Terminal, TerminalIcon, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function BgRemoverPage() {
    const router = useRouter()
    const [originalImage, setOriginalImage] = useState<string | null>(null)
    const [processedImage, setProcessedImage] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [currentCommand, setCurrentCommand] = useState("")
    const [showCursor, setShowCursor] = useState(true)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { toast } = useToast()

    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 500)
        return () => clearInterval(interval)
    })

    const availableCommands = [
        { command: "back", description: "Back to dashboard" },
        { command: "upload", description: "Upload an image" },
        { command: "process", description: "Process uploaded image" },
        { command: "download", description: "Download processed image" },
        { command: "clear", description: "Clear workspace" },
    ]

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return false
        if (!file.type.startsWith('image/')) toast({
            title: 'Error: Invalid file type',
            description: 'Please select an image file.',
            variant: 'destructive'
        })

        const reader = new FileReader()
        reader.onload = (e) => {
            setOriginalImage(e.target?.result as string)
            setProcessedImage(null)
            setCurrentCommand('upload completed successfully')
        }

        reader.readAsDataURL(file)
    }

    const processImage = async () => {
        if (!originalImage) return

        setIsProcessing(true)
        setCurrentCommand('processing image...')

        try {
            const response = await fetch(originalImage)
            const blob = await response.blob()

            const formData = new FormData()
            formData.append('image', blob, 'image.jpg')

            const fetchResponse = await fetch('http://api.fazrilsh.com/bg-remover', {
                method: 'POST',
                body: formData
            })

            if (!fetchResponse.ok) throw new Error('Failed to process image')

            const processedBlob = await fetchResponse.blob()
            const processedUrl = URL.createObjectURL(processedBlob)
            setProcessedImage(processedUrl)
            setCurrentCommand('background removal completed')
            toast({
                title: 'Success',
                description: 'Background removed successfully.'
            })
        } catch (error) {
            setCurrentCommand('error: process failed')
            toast({
                title: 'Error',
                description: 'Failed to remove background. Please try again.',
                variant: 'destructive'
            })
        } finally {
            setIsProcessing(false)
        }
    }

    const downloadImage = () => {
        if (processedImage) {
            const link = document.createElement('a')
            link.href = processedImage
            link.download = 'background-removed.png'

            document.body.appendChild(link)
            link.click()

            document.body.removeChild(link)
            setCurrentCommand('download completed')
        }
    }

    const clearImages = () => {
        setOriginalImage(null)
        setProcessedImage(null)
        setCurrentCommand('workspace cleared')
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleCommandClick = (command: string) => {
        setCurrentCommand(command)
        switch (command) {
            case 'back':
                router.push('/')
                break
            case 'upload':
                fileInputRef.current?.click()
                break
            case 'process':
                processImage()
                break
            case 'download':
                downloadImage()
                break
            case 'clear':
                clearImages()
                break
        }
    }

    const changeFullscreen = () => {
        const element = document.documentElement
        if ('requestFullscreen' in element) {
            element.requestFullscreen()
        } else if ('webkitRequestFullscreen' in (element as any)) {
            (element as any).webkitRequestFullscreen()
        } else if ('msRequestFullscreen' in (element as any)) {
            (element as any).msRequestFullscreen()
        }
    }

    return <main className="min-h-screen sm:min-h-[100dvh] bg-gray-900 text-green-500 font-mono overflow-hidden">
        <div className="relative h-screen flex flex-col">
            <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700 rounded-t-lg relative">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
                    <div
                        className="w-3 h-3 rounded-full bg-yellow-500"
                        aria-hidden="true"
                        onClick={() => document.fullscreenElement && document.exitFullscreen()}
                    />
                    <div
                        className="w-3 h-3 rounded-full bg-green-500"
                        aria-hidden="true"
                        onClick={changeFullscreen}
                    />
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 text-sm text-gray-400">
                    fazril@portfolio: /home/bg-remover
                </div>

                <div className="flex items-center gap-2">
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                            {isMenuOpen ? <X className="w-5 h-5 text-gray-300" /> : <Menu className="w-5 h-5 text-gray-300" />}
                        </button>

                        {isMenuOpen && (
                            <div className="absolute right-2 top-12 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-3 z-50 flex flex-col gap-2">
                                <a
                                    href="/fazril-syaveral-hillaby.pdf"
                                    download
                                    className="inline-flex items-center gap-1 text-xs px-2 py-1 border border-gray-700 text-gray-300 bg-transparent hover:bg-gray-800 hover:text-green-400 rounded-md"
                                    aria-label="Download CV"
                                >
                                    <Download className="h-3 w-3" />
                                    Download CV
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        <a
                            href="/fazril-syaveral-hillaby.pdf"
                            download
                            className="inline-flex items-center gap-1 text-xs px-2 py-1 border border-gray-700 text-gray-300 bg-transparent hover:bg-gray-800 hover:text-green-400 rounded-md"
                            aria-label="Download CV"
                        >
                            <Download className="h-3 w-3" />
                            Download CV
                        </a>
                        <TerminalIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </div>

            <div
                className="flex-1 p-4 overflow-y-auto bg-grey-900 bg-opacity-90 font-mono text-sm md:text-base relative"
                style={{
                    backgroundImage: "radial-gradient(rgba(0, 150, 0, 0.05) 1px, transparent 0)",
                    backgroundSize: "25px 25px",
                }}
                role="log"
                aria-live="polite"
                aria-label="Terminal output"
            >
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
                        backgroundSize: "100% 4px",
                    }}
                    aria-hidden="true"
                />

                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mb-6 text-green-400"
                    >
                        <p className="mb-2">Welcome to my background remover terminal!</p>
                        <p>
                            Upload an <span className="text-yellow-300">image</span> and use commands below to remove background using <span className="text-yellow-300">OpenCV</span>.
                        </p>
                    </motion.div>
                </AnimatePresence>

                <div className="flex items-center text-green-400">
                    <span className="text-blue-400">fazril@portfolio</span>
                    <span className="text-white">:</span>
                    <span className="text-purple-400">/home/bg-remover</span>
                    <span className="text-white">$</span>
                    <div className="flex items-center ml-2">
                        <span className="bg-transparent border-none outline-none text-green-400 w-full">{currentCommand}</span>
                        <span className={`h-5 w-2 bg-green-400 ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                    <div className="space-y-4">
                        <h3 className="text-green-400 text-lg">{'>'} Original Image</h3>
                        <div className="border-2 border-dashed border-green-500 rounded-lg p-8 text-center cursor-pointer hover:border-green-400 transition-colors min-h-[300px] flex items-center justify-center"
                            onClick={() => fileInputRef.current?.click()}>
                            {
                                originalImage ? <div className="space-y-2">
                                    <img src={originalImage || '/placeholder.svg'} alt="Original" className="max-w-full max-h-64 mx-auto rounded-lg" />
                                    <p className="text-green-300 mx-auto text-sm">Image loaded successfully</p>
                                </div> : <div className="space-y-4 flex flex-col items-center justify-center">
                                    <Upload className="w-16 h-16 text-green-500" />
                                    <div>
                                        <p className="text-green-400 mb-2">Click to upload image</p>
                                        <p className="text-green-300 text-sm">Supported: PNG, JPEG, JPG</p>
                                    </div>
                                </div>
                            }
                        </div>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-green-400 text-lg">{'>'} Processed Image</h3>
                        <div className="border-2 border-dashed border-green-500 rounded-lg p-8 text-center min-h-[300px] flex items-center justify-center bg-gray-800">
                            {
                                isProcessing ? <div className="space-y-4">
                                    <Loader2 className="w-16 h-16 mx-auto text-green-400 animate-spin" />
                                    <div>
                                        <p className="text-green-400 mb-2">Processing image...</p>
                                        <p className="text-green-300 text-sm">Running OpenCV algorithms</p>
                                    </div>
                                </div> : processedImage ? <div className="space-y-2">
                                    <img
                                        src={processedImage || '/placeholder.svg'}
                                        alt="Processed"
                                        className="max-w-full max-h-64 mx-auto rounded-lg"
                                        style={{ backgroundColor: "transparent" }}
                                    />
                                    <p className="textogreen-300 text-sm">Background removed successfully</p>
                                </div> : <div className="space-y-4">
                                    <Terminal className="w-16 h-16 mx-auto text-green-500" />
                                    <div>
                                        <p className="text-green-400 mb-2">Awaiting processing</p>
                                        <p className="text-green-400 text-sm">Upload an image first</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-2 bg-gray-800 border-t border-gray-700 rounded-b-lg overflow-x-auto">
                <div className="flex gap-2 flex-wrap justify-center items-center">
                    {availableCommands.map((cmd) => (
                        <Button
                            key={cmd.command}
                            variant="outline"
                            size="sm"
                            disabled={
                                (cmd.command === 'process' && (!originalImage || isProcessing)) ||
                                (cmd.command === 'download' && !processedImage) ||
                                (cmd.command === 'clear' && (!originalImage && !processedImage))
                            }
                            className="text-xs bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-green-400"
                            onClick={() => handleCommandClick(cmd.command)}
                            aria-label={`Run ${cmd.command} command: ${cmd.description}`}
                        >
                            {cmd.command}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    </main >
}