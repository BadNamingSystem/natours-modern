import js from "@eslint/js"
import tseslint from "typescript-eslint"

export default tseslint.config(
    {
        files: ["**/*.{js,ts}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                // Node.js globals (ESM compatible)
                process: "readonly",
                console: "readonly",
                Buffer: "readonly",
                setTimeout: "readonly",
                clearTimeout: "readonly",
                setInterval: "readonly",
                clearInterval: "readonly",
            },
        },
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        rules: {
            // Warnings
            "no-unused-vars": "off", // Turned off to use the TS version
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^(req|res|next|val|err|_)$",
                    varsIgnorePattern: "^_$",
                },
            ],

            // Disabled rules
            "no-process-exit": "off",
            "no-underscore-dangle": "off",

            // Best practices
            "no-var": "error",
            "prefer-const": "error",
            "prefer-arrow-callback": "off",
            "no-throw-literal": "error",
            "prefer-promise-reject-errors": "error",

            // Allow any for now as we transition
            "@typescript-eslint/no-explicit-any": "warn",
        },
    },
)
