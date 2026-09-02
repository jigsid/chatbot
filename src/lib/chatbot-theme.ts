const DEFAULT_BRAND = '#0B1F3A'
const DEFAULT_PANEL = '#F4F5F7'

const parseColor = (color?: string | null) => {
  if (!color) return null
  const value = color.trim()

  const rgb = value.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
  if (rgb) {
    return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) }
  }

  let hex = value.startsWith('#') ? value.slice(1) : value
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }
  if (!/^[0-9a-f]{6}$/i.test(hex)) return null

  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  }
}

const luminance = (color: { r: number; g: number; b: number }) => {
  const channel = [color.r, color.g, color.b].map((value) => {
    const scaled = value / 255
    return scaled <= 0.03928
      ? scaled / 12.92
      : Math.pow((scaled + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * channel[0] + 0.7152 * channel[1] + 0.0722 * channel[2]
}

const isLight = (color?: string | null) => {
  const parsed = parseColor(color)
  if (!parsed) return true
  return luminance(parsed) > 0.55
}

export const getWidgetPalette = (
  background?: string | null,
  textColor?: string | null
) => {
  const lightCanvas = isLight(background)
  const darkText = !isLight(textColor)

  const brand = lightCanvas
    ? darkText && textColor
      ? textColor
      : DEFAULT_BRAND
    : background || DEFAULT_BRAND

  return {
    brand,
    onBrand: isLight(brand) ? '#0F172A' : '#FFFFFF',
    panel: lightCanvas ? background || DEFAULT_PANEL : DEFAULT_PANEL,
  }
}
