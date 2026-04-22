const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js')
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js')
const { z } = require('zod')

// Create MCP server
const server = new McpServer({
  name: 'casa-alquiler-cubano-server',
  version: '1.0.0',
})

// ============================================
// Tool 1: search_properties
// ============================================
server.tool(
  'search_properties',
  'Search for rental properties in Cuba with filters',
  {
    location: z
      .string()
      .optional()
      .describe("City or area (e.g., 'La Habana', 'Varadero', 'Trinidad')"),
    min_price: z.number().optional().describe('Minimum price in USD per night'),
    max_price: z.number().optional().describe('Maximum price in USD per night'),
    bedrooms: z.number().optional().describe('Minimum number of bedrooms'),
    property_type: z
      .string()
      .optional()
      .describe("Type: 'casa_particular', 'apartamento', 'villa', 'habitacion'"),
  },
  async ({ location, min_price, max_price, bedrooms, property_type }) => {
    // Simulated property data (would connect to real DB in production)
    const properties = [
      {
        id: 'PROP-001',
        title: 'Casa Colonial en Trinidad',
        location: 'Trinidad',
        price_per_night: 45,
        bedrooms: 2,
        bathrooms: 1,
        property_type: 'casa_particular',
        amenities: ['wifi', 'aire_acondicionado', 'desayuno'],
        rating: 4.8,
        description: 'Encantadora casa colonial con terraza y vista al mar',
      },
      {
        id: 'PROP-002',
        title: 'Apartamento Moderno en Vedado',
        location: 'La Habana',
        price_per_night: 60,
        bedrooms: 1,
        bathrooms: 1,
        property_type: 'apartamento',
        amenities: ['wifi', 'aire_acondicionado', 'cocina'],
        rating: 4.5,
        description: 'Apartamento renovado en el corazón de Vedado',
      },
      {
        id: 'PROP-003',
        title: 'Villa frente al Mar en Varadero',
        location: 'Varadero',
        price_per_night: 120,
        bedrooms: 3,
        bathrooms: 2,
        property_type: 'villa',
        amenities: ['wifi', 'aire_acondicionado', 'piscina', 'playa_privada'],
        rating: 4.9,
        description: 'Villa de lujo con acceso directo a la playa',
      },
      {
        id: 'PROP-004',
        title: 'Habitación en Centro Habana',
        location: 'La Habana',
        price_per_night: 25,
        bedrooms: 1,
        bathrooms: 1,
        property_type: 'habitacion',
        amenities: ['ventilador', 'desayuno'],
        rating: 4.2,
        description: 'Habitación económica cerca del Malecón',
      },
      {
        id: 'PROP-005',
        title: 'Casa en Viñales',
        location: 'Viñales',
        price_per_night: 35,
        bedrooms: 2,
        bathrooms: 1,
        property_type: 'casa_particular',
        amenities: ['wifi', 'desayuno', 'tour_mogotes'],
        rating: 4.7,
        description: 'Casa tradicional con vista a los mogotes',
      },
    ]

    // Apply filters
    let filtered = properties
    if (location) {
      filtered = filtered.filter((p) => p.location.toLowerCase().includes(location.toLowerCase()))
    }
    if (min_price !== undefined) {
      filtered = filtered.filter((p) => p.price_per_night >= min_price)
    }
    if (max_price !== undefined) {
      filtered = filtered.filter((p) => p.price_per_night <= max_price)
    }
    if (bedrooms !== undefined) {
      filtered = filtered.filter((p) => p.bedrooms >= bedrooms)
    }
    if (property_type) {
      filtered = filtered.filter((p) => p.property_type === property_type)
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              total_results: filtered.length,
              properties: filtered,
            },
            null,
            2
          ),
        },
      ],
    }
  }
)

// ============================================
// Tool 2: get_property_details
// ============================================
server.tool(
  'get_property_details',
  'Get detailed information about a specific property',
  {
    property_id: z.string().describe("Property ID (e.g., 'PROP-001')"),
  },
  async ({ property_id }) => {
    const properties = [
      {
        id: 'PROP-001',
        title: 'Casa Colonial en Trinidad',
        location: 'Trinidad',
        price_per_night: 45,
        bedrooms: 2,
        bathrooms: 1,
        property_type: 'casa_particular',
        amenities: ['wifi', 'aire_acondicionado', 'desayuno'],
        rating: 4.8,
        reviews_count: 124,
        description: 'Encantadora casa colonial con terraza y vista al mar',
        address: 'Calle Santiago de Cuba #23, Trinidad',
        host: { name: 'María González', response_rate: '98%', languages: ['español', 'inglés'] },
        cancellation_policy: 'Flexible: cancelación gratuita hasta 24h antes',
        check_in: '15:00',
        check_out: '11:00',
      },
      {
        id: 'PROP-002',
        title: 'Apartamento Moderno en Vedado',
        location: 'La Habana',
        price_per_night: 60,
        bedrooms: 1,
        bathrooms: 1,
        property_type: 'apartamento',
        amenities: ['wifi', 'aire_acondicionado', 'cocina'],
        rating: 4.5,
        reviews_count: 89,
        description: 'Apartamento renovado en el corazón de Vedado',
        address: 'Calle 23 e/ L y M, Vedado, La Habana',
        host: { name: 'Carlos Pérez', response_rate: '95%', languages: ['español', 'francés'] },
        cancellation_policy: 'Moderada: cancelación gratuita hasta 5 días antes',
        check_in: '14:00',
        check_out: '12:00',
      },
      {
        id: 'PROP-003',
        title: 'Villa frente al Mar en Varadero',
        location: 'Varadero',
        price_per_night: 120,
        bedrooms: 3,
        bathrooms: 2,
        property_type: 'villa',
        amenities: ['wifi', 'aire_acondicionado', 'piscina', 'playa_privada'],
        rating: 4.9,
        reviews_count: 203,
        description: 'Villa de lujo con acceso directo a la playa',
        address: 'Sector Corinto, Varadero, Matanzas',
        host: {
          name: 'Roberto Fernández',
          response_rate: '99%',
          languages: ['español', 'inglés', 'italiano'],
        },
        cancellation_policy: 'Estricta: cancelación gratuita hasta 7 días antes',
        check_in: '16:00',
        check_out: '10:00',
      },
      {
        id: 'PROP-004',
        title: 'Habitación en Centro Habana',
        location: 'La Habana',
        price_per_night: 25,
        bedrooms: 1,
        bathrooms: 1,
        property_type: 'habitacion',
        amenities: ['ventilador', 'desayuno'],
        rating: 4.2,
        reviews_count: 56,
        description: 'Habitación económica cerca del Malecón',
        address: 'Calle Infanta #156, Centro Habana',
        host: { name: 'Ana Rodríguez', response_rate: '90%', languages: ['español'] },
        cancellation_policy: 'Flexible: cancelación gratuita hasta 24h antes',
        check_in: '13:00',
        check_out: '11:00',
      },
      {
        id: 'PROP-005',
        title: 'Casa en Viñales',
        location: 'Viñales',
        price_per_night: 35,
        bedrooms: 2,
        bathrooms: 1,
        property_type: 'casa_particular',
        amenities: ['wifi', 'desayuno', 'tour_mogotes'],
        rating: 4.7,
        reviews_count: 78,
        description: 'Casa tradicional con vista a los mogotes',
        address: 'Calle Salvador Cisneros #45, Viñales, Pinar del Río',
        host: {
          name: 'José Martínez',
          response_rate: '96%',
          languages: ['español', 'inglés', 'alemán'],
        },
        cancellation_policy: 'Moderada: cancelación gratuita hasta 3 días antes',
        check_in: '15:00',
        check_out: '11:00',
      },
    ]

    const property = properties.find((p) => p.id === property_id)

    if (!property) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ error: `Property '${property_id}' not found` }, null, 2),
          },
        ],
        isError: true,
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(property, null, 2),
        },
      ],
    }
  }
)

// ============================================
// Tool 3: calculate_booking_cost
// ============================================
server.tool(
  'calculate_booking_cost',
  'Calculate total booking cost including taxes and fees',
  {
    property_id: z.string().describe('Property ID'),
    nights: z.number().min(1).describe('Number of nights'),
    guests: z.number().min(1).optional().describe('Number of guests (default: 1)'),
  },
  async ({ property_id, nights, guests = 1 }) => {
    const prices = {
      'PROP-001': 45,
      'PROP-002': 60,
      'PROP-003': 120,
      'PROP-004': 25,
      'PROP-005': 35,
    }

    const pricePerNight = prices[property_id]
    if (!pricePerNight) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ error: `Property '${property_id}' not found` }, null, 2),
          },
        ],
        isError: true,
      }
    }

    const subtotal = pricePerNight * nights
    const service_fee = Math.round(subtotal * 0.12 * 100) / 100 // 12% service fee
    const cleaning_fee = 15 // Fixed cleaning fee
    const taxes = Math.round((subtotal + service_fee) * 0.11 * 100) / 100 // 11% taxes
    const total = subtotal + service_fee + cleaning_fee + taxes

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              property_id,
              price_per_night: pricePerNight,
              nights,
              guests,
              breakdown: {
                subtotal: `$${subtotal}`,
                service_fee: `$${service_fee}`,
                cleaning_fee: `$${cleaning_fee}`,
                taxes: `$${taxes}`,
                total: `$${total}`,
              },
            },
            null,
            2
          ),
        },
      ],
    }
  }
)

// ============================================
// Tool 4: get_cuba_travel_info
// ============================================
server.tool(
  'get_cuba_travel_info',
  'Get travel information about Cuban destinations',
  {
    destination: z
      .string()
      .optional()
      .describe("Destination city (e.g., 'La Habana', 'Trinidad', 'Viñales', 'Varadero')"),
  },
  async ({ destination }) => {
    const travelInfo = {
      'La Habana': {
        description:
          'Capital de Cuba, conocida por su historia colonial, música en vivo y arquitectura art deco',
        best_time: 'Noviembre a Abril (temporada seca)',
        currency: 'CUP (Peso Cubano), USD aceptados en zonas turísticas',
        transportation: 'Taxi, autobús, coco taxi',
        attractions: [
          'La Habana Vieja',
          'El Malecón',
          'Castillo del Morro',
          'Plaza de la Revolución',
          'Museo de Bellas Artes',
        ],
        avg_property_price: 50,
      },
      Trinidad: {
        description:
          'Ciudad colonial patrimonio de la humanidad, con calles empedradas y música tradicional',
        best_time: 'Noviembre a Abril',
        currency: 'CUP',
        transportation: 'Taxi, bici taxi',
        attractions: [
          'Plaza Mayor',
          'Valle de los Ingenios',
          'Playa Ancón',
          'Museo Romántico',
          'Cueva del Agua',
        ],
        avg_property_price: 40,
      },
      Viñales: {
        description:
          'Pueblo rodeado de mogotes (formaciones kársticas), ideal para ecoturismo y cultivo de tabaco',
        best_time: 'Diciembre a Abril',
        currency: 'CUP',
        transportation: 'Taxi, bicicleta',
        attractions: [
          'Valle de Viñales',
          'Cueva del Indio',
          'Mural de la Prehistoria',
          'Fincas de tabaco',
          'Los Jazmines',
        ],
        avg_property_price: 35,
      },
      Varadero: {
        description: 'Playa paradisíaca con 20 km de arena blanca y aguas cristalinas',
        best_time: 'Todo el año, mejor Noviembre a Abril',
        currency: 'CUP, USD, EUR',
        transportation: 'Taxi, autobús turístico',
        attractions: [
          'Playa Varadero',
          'Cueva de Saturno',
          'Parque Josone',
          'Coralia Dive Center',
          'Delfinario',
        ],
        avg_property_price: 100,
      },
    }

    if (destination) {
      const info = travelInfo[destination]
      if (!info) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  error: `Destination '${destination}' not found`,
                  available_destinations: Object.keys(travelInfo),
                },
                null,
                2
              ),
            },
          ],
          isError: true,
        }
      }
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ [destination]: info }, null, 2),
          },
        ],
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              available_destinations: Object.keys(travelInfo),
              summary: 'Specify a destination to get detailed travel information',
            },
            null,
            2
          ),
        },
      ],
    }
  }
)

// ============================================
// Tool 5: get_availability_calendar
// ============================================
server.tool(
  'get_availability_calendar',
  'Check property availability for specific dates',
  {
    property_id: z.string().describe('Property ID'),
    check_in: z.string().describe('Check-in date (YYYY-MM-DD)'),
    check_out: z.string().describe('Check-out date (YYYY-MM-DD)'),
  },
  async ({ property_id, check_in, check_out }) => {
    // Simulated availability (in production, this would query a database)
    const blockedDates = {
      'PROP-001': [
        { start: '2026-05-10', end: '2026-05-15' },
        { start: '2026-07-01', end: '2026-07-10' },
      ],
      'PROP-002': [{ start: '2026-04-20', end: '2026-04-25' }],
      'PROP-003': [
        { start: '2026-06-01', end: '2026-06-15' },
        { start: '2026-08-01', end: '2026-08-20' },
      ],
      'PROP-004': [],
      'PROP-005': [{ start: '2026-05-01', end: '2026-05-05' }],
    }

    const propertyBlocked = blockedDates[property_id] || []

    // Check if requested dates overlap with blocked dates
    const requestedStart = new Date(check_in)
    const requestedEnd = new Date(check_out)
    const conflicts = propertyBlocked.filter((blocked) => {
      const blockedStart = new Date(blocked.start)
      const blockedEnd = new Date(blocked.end)
      return requestedStart < blockedEnd && requestedEnd > blockedStart
    })

    const available = conflicts.length === 0

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              property_id,
              check_in,
              check_out,
              available,
              conflicts: conflicts.length > 0 ? conflicts : undefined,
              message: available
                ? 'Property is available for the requested dates'
                : 'Property has conflicts with existing bookings',
            },
            null,
            2
          ),
        },
      ],
    }
  }
)

// ============================================
// Start the server
// ============================================
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Casa Alquiler Cubano MCP Server running on stdio')
}

main().catch(console.error)
