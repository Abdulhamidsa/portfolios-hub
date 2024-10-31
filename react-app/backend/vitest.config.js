//import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        root: './src',
        setupFiles: ['./test/setup-test.js'],
        include: ['./test/**/*.test.js'],
        coverage: {
            all: false,
            provider: 'istanbul',
            include: ['**/*.js'],
            skipFull: true, // dont show files with 100% cove rage
            reportOnFailure: false, //all: true,
            reportsDirectory: '../coverage',
        },

        reporters: 'basic', // this only prints once
    },
})
