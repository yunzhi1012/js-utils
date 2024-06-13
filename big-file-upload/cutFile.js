// import { createChunk } from './createChunk.js'
const CHUNK_SIZE = 1024 * 1024 * 5  // 一片5M
const THREAD_COUNT = 4  // 线程数


export function cutFile(file) {
    return new Promise((resolve, reject) => {
        const result = []
        const chunkCount = Math.ceil(file.size / CHUNK_SIZE)
        const workerChunkCount = Math.ceil(chunkCount / THREAD_COUNT)
        let finishCount = 0
        for (let i = 0; i < THREAD_COUNT; i++) {
            const worker = new Worker('./worker.js', {
                type: 'module',
            })
            const startIndex = i * workerChunkCount
            const endIndex = startIndex + workerChunkCount > chunkCount ? chunkCount : startIndex + workerChunkCount
            worker.postMessage({
                file,
                CHUNK_SIZE,
                startIndex,
                endIndex
            })
            worker.onmessage = (event) => {
                for (let i = startIndex; i < endIndex; i++) {
                    result[i] = event.data[i - startIndex]
                }
                worker.terminate()
                finishCount++
                if (finishCount === THREAD_COUNT) {
                    resolve(result)
                }
            }
        }
    })
}