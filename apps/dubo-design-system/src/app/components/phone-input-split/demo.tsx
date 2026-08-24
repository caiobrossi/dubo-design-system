"use client";

import * as React from "react";
import { PhoneInputSplit } from "@/components/ui/phone-input-split";

export function PhoneInputSplitEmptyDemo() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-lg">
      <PhoneInputSplit
        label="Telefone"
        value={value}
        onChange={setValue}
        onClear={() => setValue("")}
        variant="filled"
        clearable
        searchPlaceholder="Pesquisar país"
        noCountriesFoundText="Nenhum país encontrado"
      />
    </div>
  );
}

export function PhoneInputSplitFilledDemo() {
  const [value, setValue] = React.useState("+351912345678");

  return (
    <div className="w-full max-w-lg">
      <PhoneInputSplit
        label="Telefone"
        value={value}
        onChange={setValue}
        onClear={() => setValue("")}
        variant="filled"
        clearable
        searchPlaceholder="Pesquisar país"
        noCountriesFoundText="Nenhum país encontrado"
      />
    </div>
  );
}

export function PhoneInputSplitDualDemo() {
  const [phone, setPhone] = React.useState("+351912345678");
  const [whatsapp, setWhatsapp] = React.useState("");

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <PhoneInputSplit
        label="Telefone"
        value={phone}
        onChange={setPhone}
        onClear={() => setPhone("")}
        variant="filled"
        clearable
        searchPlaceholder="Pesquisar país"
        noCountriesFoundText="Nenhum país encontrado"
      />
      <PhoneInputSplit
        label="WhatsApp"
        value={whatsapp}
        onChange={setWhatsapp}
        onClear={() => setWhatsapp("")}
        variant="filled"
        clearable
        searchPlaceholder="Pesquisar país"
        noCountriesFoundText="Nenhum país encontrado"
      />
    </div>
  );
}
