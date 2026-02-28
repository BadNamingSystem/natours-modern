const blue = "\x1b[34m"
const yellow = "\x1b[33m"
const green = "\x1b[32m"
const red = "\x1b[31m"
const reset = "\x1b[0m"

export const dbSuccess = (cluster: string, env: string) => {
    console.log(`${green}✔ DB connection successful${reset}`)
    console.log(`Target Cluster: ${blue}${cluster}${reset}`)
    console.log(`Environment: ${yellow}${env}${reset}\n`)
}

export const dbError = (error: Error) => {
    console.log(`${red}✘ DB connection error${reset}`, error)
}

export const appRunning = (port: number | string) => {
    console.log(`${green}✔ App running on port ${port}${reset}`)
}
