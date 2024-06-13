import SparkMD5 from './sparkmd5.js'

export function createChunk(file, index, chunkSize) {
    return new Promise((resolve, reject) => {
        const start = index * chunkSize
        const end = start + chunkSize > file.size ? file.size : start + chunkSize
        const spark = new SparkMD5.ArrayBuffer()
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            spark.append(e.target.result)
            resolve({
                start,
                end,
                index,
                hash: spark.end()
            })
        }
        fileReader.readAsArrayBuffer(file.slice(start, end))
    })
}