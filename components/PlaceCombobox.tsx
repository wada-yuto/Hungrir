// components/PlaceCombobox.tsx
import {
    Combobox,
    ComboboxContent,
    ComboboxItem,
    ComboboxTrigger,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function PlaceCombobox({ onPlaceSelected }) {
    const [input, setInput] = useState("");
    const [predictions, setPredictions] = useState([]);
    const [autocompleteService, setAutocompleteService] = useState(null);
    const [placesService, setPlacesService] = useState(null);

    useEffect(() => {
        if (window.google && !autocompleteService) {
            setAutocompleteService(
                new google.maps.places.AutocompleteService()
            );
            const dummy = document.createElement("div");
            setPlacesService(new google.maps.places.PlacesService(dummy));
        }
    }, []);

    useEffect(() => {
        if (autocompleteService && input) {
            autocompleteService.getPlacePredictions(
                { input, componentRestrictions: { country: "jp" } },
                (results) => setPredictions(results || [])
            );
        } else {
            setPredictions([]);
        }
    }, [input]);

    const handleSelect = (placeId) => {
        placesService?.getDetails(
            { placeId, fields: ["formatted_address", "geometry", "name"] },
            (place) => {
                if (place) onPlaceSelected(place);
            }
        );
    };

    return (
        <Combobox onValueChange={handleSelect}>
            <ComboboxTrigger asChild>
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search location"
                />
            </ComboboxTrigger>
            <ComboboxContent>
                {predictions.map((p) => (
                    <ComboboxItem key={p.place_id} value={p.place_id}>
                        {p.description}
                    </ComboboxItem>
                ))}
            </ComboboxContent>
        </Combobox>
    );
}
