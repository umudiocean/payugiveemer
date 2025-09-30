/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        extend: {
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                colors: {
                        // Squid Game theme colors
                        'squid-dark': '#0B0F14',
                        'squid-pink': '#FF2A6D',
                        'squid-teal': '#2BB673',
                        'squid-purple': '#6A00FF',
                        'squid-grey': '#A7AAB3',
                        'squid-success': '#3BD671',
                        'squid-error': '#FF4545',
                        // shadcn/ui colors
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        }
                },
                fontFamily: {
                        'inter': ['Inter', 'system-ui', 'sans-serif'],
                        'satoshi': ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
                },
                boxShadow: {
                        'glow': '0 0 20px rgba(255, 42, 109, 0.3)',
                        'glow-teal': '0 0 20px rgba(43, 182, 115, 0.3)',
                        'glow-purple': '0 0 20px rgba(106, 0, 255, 0.3)',
                },
                keyframes: {
                        'accordion-down': {
                                from: {
                                        height: '0'
                                },
                                to: {
                                        height: 'var(--radix-accordion-content-height)'
                                }
                        },
                        'accordion-up': {
                                from: {
                                        height: 'var(--radix-accordion-content-height)'
                                },
                                to: {
                                        height: '0'
                                }
                        },
                        float: {
                                '0%, 100%': { transform: 'translateY(0px)' },
                                '50%': { transform: 'translateY(-20px)' },
                        },
                        'pulse-glow': {
                                '0%': { boxShadow: '0 0 20px rgba(255, 42, 109, 0.3)' },
                                '100%': { boxShadow: '0 0 30px rgba(255, 42, 109, 0.6)' },
                        },
                        'fade-in': {
                                '0%': { opacity: '0', transform: 'translateY(10px)' },
                                '100%': { opacity: '1', transform: 'translateY(0px)' },
                        },
                        'glow': {
                                '0%, 100%': { textShadow: '0 0 20px rgba(255, 42, 109, 0.5)' },
                                '50%': { textShadow: '0 0 30px rgba(255, 42, 109, 0.8), 0 0 40px rgba(43, 182, 115, 0.3)' },
                        },
                        'squid-pulse': {
                                '0%, 100%': { transform: 'scale(1)', opacity: '1' },
                                '50%': { transform: 'scale(1.05)', opacity: '0.8' },
                        }
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'float': 'float 6s ease-in-out infinite',
                        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
                        'fade-in': 'fade-in 0.8s ease-out',
                        'glow': 'glow 3s ease-in-out infinite',
                        'squid-pulse': 'squid-pulse 2s ease-in-out infinite',
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};