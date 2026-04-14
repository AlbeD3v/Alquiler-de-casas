// Provincias de Cuba
export const PROVINCIAS = [
  "Pinar del Río",
  "Artemisa",
  "La Habana",
  "Mayabeque",
  "Matanzas",
  "Cienfuegos",
  "Villa Clara",
  "Sancti Spíritus",
  "Ciego de Ávila",
  "Camagüey",
  "Las Tunas",
  "Holguín",
  "Granma",
  "Santiago de Cuba",
  "Guantánamo",
  "Isla de la Juventud"
] as const;

// Municipios por provincia (principales municipios de La Habana incluidos)
export const MUNICIPIOS: Record<string, string[]> = {
  "La Habana": [
    "Playa",
    "Plaza de la Revolución",
    "Centro Habana",
    "La Habana Vieja",
    "Regla",
    "Habana del Este",
    "Guanabacoa",
    "San Miguel del Padrón",
    "Diez de Octubre",
    "Cerro",
    "Marianao",
    "La Lisa",
    "Boyeros",
    "Arroyo Naranjo",
    "Cotorro"
  ],
  "Pinar del Río": [
    "Pinar del Río",
    "Viñales",
    "San Luis",
    "Consolación del Sur",
    "Guane",
    "Mantua",
    "Minas de Matahambre",
    "La Palma",
    "Los Palacios",
    "Sandino"
  ],
  "Artemisa": [
    "Artemisa",
    "San Antonio de los Baños",
    "Güira de Melena",
    "Alquízar",
    "Mariel",
    "Candelaria",
    "Bahía Honda",
    "San Cristóbal"
  ],
  "Mayabeque": [
    "San José de las Lajas",
    "Batabanó",
    "Calimete",
    "Jaruco",
    "Madruga",
    "Nueva Paz",
    "Quivicán",
    "Santa Cruz del Norte",
    "Melena del Sur",
    "Güines"
  ],
  "Matanzas": [
    "Matanzas",
    "Cárdenas",
    "Varadero",
    "Colón",
    "Perico",
    "Jovellanos",
    "Pedro Betancourt",
    "Limonar",
    "Unión de Reyes",
    "Ciénaga de Zapata"
  ],
  "Cienfuegos": [
    "Cienfuegos",
    "Rodas",
    "Palmira",
    "Lajas",
    "Cruces",
    "Abreus",
    "Aguada de Pasajeros",
    "Cumanayagua"
  ],
  "Villa Clara": [
    "Santa Clara",
    "Sagua la Grande",
    "Placetas",
    "Camajuaní",
    "Cifuentes",
    "Ranchuelo",
    "Manicaragua",
    "Remedios",
    "Caibarién",
    "Encrucijada"
  ],
  "Sancti Spíritus": [
    "Sancti Spíritus",
    "Trinidad",
    "Cabaiguán",
    "Yaguajay",
    "Jatibonico",
    "Taguasco",
    "La Sierpe",
    "Fomento"
  ],
  "Ciego de Ávila": [
    "Ciego de Ávila",
    "Morón",
    "Chambas",
    "Ciro Redondo",
    "Majagua",
    "Florencia",
    "Bolivia",
    "Primero de Enero",
    "Venezuela"
  ],
  "Camagüey": [
    "Camagüey",
    "Nuevitas",
    "Florida",
    "Esmeralda",
    "Sierra de Cubitas",
    "Minas",
    "Najasa",
    "Santa Cruz del Sur",
    "Jimaguayú",
    "Guáimaro",
    "Sibanicú",
    "Batalla de Santa Rita",
    "Vertientes"
  ],
  "Las Tunas": [
    "Las Tunas",
    "Puerto Padre",
    "Colombia",
    "Jesús Menéndez",
    "Manatí",
    "Jobabo",
    "Amancio",
    "Majibacoa"
  ],
  "Holguín": [
    "Holguín",
    "Gibara",
    "Banes",
    "Antilla",
    "Mayarí",
    "Moa",
    "Sagua de Tánamo",
    "Calixto García",
    "Rafael Freyre",
    "Cacocum",
    "Urbano Noris",
    "Cueto",
    "Báguanos"
  ],
  "Granma": [
    "Bayamo",
    "Manzanillo",
    "Campechuela",
    "Media Luna",
    "Niquero",
    "Pilón",
    "Río Cauto",
    "Cauto Cristo",
    "Jiguaní",
    "Yara",
    "Bartolomé Masó",
    "Buena Vista"
  ],
  "Santiago de Cuba": [
    "Santiago de Cuba",
    "Palma Soriano",
    "Contramaestre",
    "San Luis",
    "Songo-La Maya",
    "Guamá",
    "Tercer Frente",
    "Segundo Frente",
    "Mella"
  ],
  "Guantánamo": [
    "Guantánamo",
    "Baracoa",
    "Maisí",
    "Imías",
    "San Antonio del Sur",
    "Caimanera",
    "Manuel Tames",
    "El Salvador"
  ],
  "Isla de la Juventud": [
    "Nueva Gerona"
  ]
} as const;

// Tipos TypeScript
export type Provincia = (typeof PROVINCIAS)[number];
export type Municipio = string;
