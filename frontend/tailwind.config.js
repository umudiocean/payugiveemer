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
                        // Authentic Netflix Squid Game Colors
                        'squid-black': '#08050F',
                        'squid-dark-red': '#A60C37',
                        'squid-dark-blue': '#251D58',
                        'squid-blue': '#453397',
                        'squid-dark-purple': '#57274A',
                        'squid-red': '#B82F49',
                        'squid-grey': '#8A808C',
                        'squid-light-grey': '#DCD5DC',
                        
                        // Backward compatibility aliases
                        'squid-pink': '#B82F49',
                        'squid-green': '#453397',
                        'squid-mint': '#453397',
                        'squid-purple': '#57274A',
                        'squid-navy': '#251D58',
                        'squid-white': '#DCD5DC',
                        'squid-grey-dark': '#8A808C',
                        'squid-grey-light': '#DCD5DC',
                        'squid-dark': '#08050F',
                        'squid-teal': '#453397',
                        'squid-success': '#453397',
                        'squid-error': '#A60C37',
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
                        'squid': ['Bebas Neue', 'Arial', 'sans-serif'],
                        'squid-display': ['Bebas Neue', 'Arial', 'sans-serif'],
                        'squid-body': ['Bebas Neue', 'Arial', 'sans-serif'],
                        'bebas': ['Bebas Neue', 'Arial', 'sans-serif'],
                        'inter': ['Inter', 'system-ui', 'sans-serif'],
                        'satoshi': ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
                },
                boxShadow: {
                        'glow': '0 0 20px rgba(184, 47, 73, 0.5)',
                        'glow-red': '0 0 20px rgba(184, 47, 73, 0.5)',
                        'glow-dark-red': '0 0 20px rgba(166, 12, 55, 0.5)',
                        'glow-blue': '0 0 20px rgba(69, 51, 151, 0.5)',
                        'glow-dark-blue': '0 0 20px rgba(37, 29, 88, 0.5)',
                        'glow-purple': '0 0 20px rgba(87, 39, 74, 0.5)',
                        'glow-grey': '0 0 20px rgba(138, 128, 140, 0.3)',
                        // Backward compatibility
                        'glow-pink': '0 0 20px rgba(184, 47, 73, 0.5)',
                        'glow-green': '0 0 20px rgba(69, 51, 151, 0.5)',
                        'glow-mint': '0 0 20px rgba(69, 51, 151, 0.5)',
                        'glow-teal': '0 0 20px rgba(69, 51, 151, 0.5)',
                        'glow-navy': '0 0 20px rgba(37, 29, 88, 0.5)',
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
                                '0%': { boxShadow: '0 0 20px rgba(255, 51, 102, 0.4)' },
                                '100%': { boxShadow: '0 0 30px rgba(255, 51, 102, 0.7)' },
                        },
                        'fade-in': {
                                '0%': { opacity: '0', transform: 'translateY(10px)' },
                                '100%': { opacity: '1', transform: 'translateY(0px)' },
                        },
                        'glow': {
                                '0%, 100%': { textShadow: '0 0 20px rgba(255, 51, 102, 0.6)' },
                                '50%': { textShadow: '0 0 30px rgba(255, 51, 102, 0.9), 0 0 40px rgba(0, 208, 132, 0.4)' },
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