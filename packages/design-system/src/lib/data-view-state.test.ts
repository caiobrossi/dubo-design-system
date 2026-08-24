import { describe, expect, it } from "vitest";

import {
	METRIC_UNAVAILABLE,
	formatMetricValue,
	resolveDataViewState,
} from "./data-view-state";

describe("resolveDataViewState", () => {
	it("mostra a lista quando há dados", () => {
		expect(resolveDataViewState({ isPending: false, isError: false, isEmpty: false })).toBe(
			"ready"
		);
	});

	it("mostra o estado vazio quando a resposta chegou e não trouxe nada", () => {
		expect(resolveDataViewState({ isPending: false, isError: false, isEmpty: true })).toBe(
			"empty"
		);
	});

	it("mostra o carregamento enquanto a primeira resposta não chegou", () => {
		expect(resolveDataViewState({ isPending: true, isError: false, isEmpty: true })).toBe(
			"loading"
		);
	});

	// O achado DUB-019/020/021: a lista vem vazia porque o pedido falhou, e o
	// ecrã anunciava "não há nada" sobre dados que existem na clínica.
	it("mostra o erro, não o vazio, quando o pedido falhou e não trouxe dados", () => {
		expect(resolveDataViewState({ isPending: false, isError: true, isEmpty: true })).toBe(
			"error"
		);
	});

	it("mostra o erro mesmo quando ainda há dados em cache", () => {
		expect(resolveDataViewState({ isPending: false, isError: true, isEmpty: false })).toBe(
			"error"
		);
	});

	it("o erro ganha ao carregamento quando a query falhou e está a tentar de novo", () => {
		expect(resolveDataViewState({ isPending: true, isError: true, isEmpty: true })).toBe("error");
	});
});

describe("formatMetricValue", () => {
	it("devolve o valor quando foi calculado", () => {
		expect(formatMetricValue(47)).toBe(47);
	});

	it("devolve zero quando zero é o valor real", () => {
		expect(formatMetricValue(0)).toBe(0);
	});

	it("devolve null durante o carregamento para o chamador mostrar o esqueleto", () => {
		expect(formatMetricValue(47, { isLoading: true })).toBeNull();
	});

	// A segunda mentira: quatro zeros calculados a partir de dados que não chegaram.
	it("não inventa zero quando o pedido falhou", () => {
		expect(formatMetricValue(0, { isError: true })).toBe(METRIC_UNAVAILABLE);
		expect(formatMetricValue(undefined)).toBe(METRIC_UNAVAILABLE);
		expect(formatMetricValue(null)).toBe(METRIC_UNAVAILABLE);
	});

	it("o carregamento ganha ao erro, para não piscar traços entre tentativas", () => {
		expect(formatMetricValue(undefined, { isError: true, isLoading: true })).toBeNull();
	});
});
