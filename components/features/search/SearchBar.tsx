"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PROVINCIAS } from "@/config/cuba-locations";

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
  onToggleFilters: () => void;
  showFilters: boolean;
}

export function SearchBar({ onSearch, onToggleFilters, showFilters }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch(query, location);
  };

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border/40 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por título, descripción o amenities..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 h-12"
            />
          </div>

          {/* Location Select */}
          <div className="md:w-56">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol"
            >
              <option value="">📍 Todas las provincias</option>
              {PROVINCIAS.map((provincia) => (
                <option key={provincia} value={provincia}>
                  {provincia}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <Button variant="golden" size="lg" onClick={handleSearch} className="md:w-40">
            <Search className="h-5 w-5 mr-2" />
            Buscar
          </Button>

          {/* Filter Toggle (Mobile) */}
          <Button
            variant="outline"
            size="lg"
            onClick={onToggleFilters}
            className="md:hidden"
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
