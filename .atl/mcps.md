# MCPs Integrados — AlmaCuba

## MCPs de Desarrollo (configurados en Windsurf)

| MCP | Estado | Uso |
|-----|--------|-----|
| `github` | ✅ Activo | Issues, PRs, branches, commits — repo `AlbeD3v/Alquiler-de-casas` |
| `stitch` | ✅ Activo | Leer diseños UI de Google Stitch y convertirlos a código |

### GitHub MCP
```json
"github": {
  "serverUrl": "https://api.githubcopilot.com/mcp/",
  "headers": { "Authorization": "Bearer <PAT>" }
}
```

### Stitch MCP
```json
"stitch": {
  "type": "stdio",
  "command": "npx",
  "args": ["@_davideast/stitch-mcp", "proxy"],
  "env": {
    "STITCH_PROJECT_ID": "level-strategy-494103-k8",
    "CLOUDSDK_CONFIG": "C:\\Users\\almag\\.stitch-mcp\\config"
  }
}
```

---

## MCPs del Proyecto (casa-alquiler-cubano)

Servidor: `casa-alquiler-cubano` (5 herramientas)

| Herramienta | Parámetros | Uso en app |
|-------------|------------|------------|
| `search_properties` | location, minPrice, maxPrice, bedrooms, propertyType | Página de búsqueda + sidebar |
| `get_property_details` | propertyId | Página `/properties/[id]` |
| `calculate_booking_cost` | propertyId, checkIn, checkOut, guests | Modal de reserva |
| `get_cuba_travel_info` | destination | Widget landing + tips por provincia |
| `get_availability_calendar` | propertyId, startDate, endDate | Calendario en detalle |

## Uso en código

```ts
// Buscar propiedades
mcp__casa-alquiler-cubano__search_properties({ location: 'La Habana', bedrooms: 2 })

// Detalle
mcp__casa-alquiler-cubano__get_property_details({ propertyId: '123' })
```

## Variables de entorno requeridas

```bash
NEXT_PUBLIC_MCP_BASE_URL=https://api.casa-alquiler-cubano.com
MCP_API_KEY=tu_api_key
```
