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
                        // Original Squid Game theme colors
                        'squid-red': '#FF3366',
                        'squid-pink': '#FF467E',
                        'squid-green': '#00D084', 
                        'squid-mint': '#1DD1A1',
                        'squid-blue': '#3742FA',
                        'squid-navy': '#2C2C54',
                        'squid-black': '#0D0D0D',
                        'squid-white': '#FFFFFF',
                        'squid-grey-dark': '#2C2C2C',
                        'squid-grey-light': '#A4A4A4',
                        
                        // Backward compatibility aliases
                        'squid-dark': '#0D0D0D',
                        'squid-teal': '#00D084',
                        'squid-purple': '#3742FA', 
                        'squid-grey': '#A4A4A4',
                        'squid-success': '#00D084',
                        'squid-error': '#FF3366',
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
                        'squid': ['KCC-Ganpan', 'Noto Sans KR', 'Inter', 'sans-serif'],
                        'squid-display': ['KCC-Ganpan', 'Noto Sans KR', 'sans-serif'],
                        'squid-body': ['Inter', 'Noto Sans KR', 'sans-serif'],
                        'inter': ['Inter', 'system-ui', 'sans-serif'],
                        'satoshi': ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
                },
                boxShadow: {
                        'glow': '0 0 20px rgba(255, 51, 102, 0.4)',
                        'glow-red': '0 0 20px rgba(255, 51, 102, 0.4)',
                        'glow-pink': '0 0 20px rgba(255, 70, 126, 0.4)',
                        'glow-green': '0 0 20px rgba(0, 208, 132, 0.4)',
                        'glow-mint': '0 0 20px rgba(29, 209, 161, 0.4)',
                        'glow-blue': '0 0 20px rgba(55, 66, 250, 0.4)',
                        'glow-navy': '0 0 20px rgba(44, 44, 84, 0.4)',
                        // Backward compatibility
                        'glow-teal': '0 0 20px rgba(0, 208, 132, 0.4)',
                        'glow-purple': '0 0 20px rgba(55, 66, 250, 0.4)',
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