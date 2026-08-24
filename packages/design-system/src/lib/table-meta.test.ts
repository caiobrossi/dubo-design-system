import { describe, expect, it } from "vitest";

import { getColumnMeta, resolveColumnVisibility } from "./table-meta";

describe("resolveColumnVisibility", () => {
  const patientsColumns = [
    { id: "select", minWidth: 60 },
    { id: "name", minWidth: 350 },
    { id: "dateOfBirth", minWidth: 150, priority: 4 },
    { id: "lastVisit", minWidth: 150, priority: 2 },
    { id: "professional", minWidth: 150, priority: 3 },
    { id: "createdAt", minWidth: 150, priority: 5 },
    { id: "status", minWidth: 180 },
    { id: "actions", minWidth: 60 },
  ];

  it("não esconde nada quando a tabela cabe", () => {
    expect(resolveColumnVisibility(patientsColumns, 5000)).toEqual({});
  });

  it("sacrifica pela prioridade mais alta primeiro", () => {
    // 1250 de necessidade contra 1150 de espaço: falta uma coluna, e sai a de
    // prioridade 5 (createdAt), não a de prioridade 2.
    const hidden = resolveColumnVisibility(patientsColumns, 1150);
    expect(hidden).toEqual({ createdAt: false });
  });

  it("continua a sacrificar até caber, e pára aí", () => {
    // O caso do achado DUB-111: a 1280 px de ecrã, a lista tinha 958 px.
    const hidden = resolveColumnVisibility(patientsColumns, 958);
    expect(hidden).toEqual({ createdAt: false, dateOfBirth: false });
    // Sai a de prioridade 4, e não as de 3 e 2 — que ainda cabem.
    expect(hidden).not.toHaveProperty("professional");
    expect(hidden).not.toHaveProperty("lastVisit");
    // "Estado" e "Ações" — que era o que se perdia — ficam.
    expect(hidden).not.toHaveProperty("status");
    expect(hidden).not.toHaveProperty("actions");
  });

  it("nunca esconde uma coluna sem prioridade declarada, mesmo sem espaço nenhum", () => {
    const hidden = resolveColumnVisibility(patientsColumns, 10);
    expect(Object.keys(hidden).toSorted()).toEqual([
      "createdAt",
      "dateOfBirth",
      "lastVisit",
      "professional",
    ]);
  });

  it("ignora larguras impossíveis em vez de esconder tudo", () => {
    expect(resolveColumnVisibility(patientsColumns, 0)).toEqual({});
    expect(resolveColumnVisibility(patientsColumns, Number.NaN)).toEqual({});
  });
});

describe("getColumnMeta", () => {
  it("devolve um objecto vazio quando a coluna não declara meta", () => {
    expect(getColumnMeta(undefined)).toEqual({});
    expect(getColumnMeta({})).toEqual({});
  });

  it("lê os metadados declarados", () => {
    expect(getColumnMeta({ meta: { priority: 3, mobile: { role: "title" } } })).toEqual({
      priority: 3,
      mobile: { role: "title" },
    });
  });
});
