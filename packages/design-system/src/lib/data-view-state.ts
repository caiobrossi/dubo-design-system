/**
 * Qual dos quatro estados um ecrã de listagem deve mostrar.
 *
 * Existe porque três ecrãs (`/inventory`, `/patient-groups`,
 * `/inventory/movements`) decidiam isto cada um à sua maneira, e os três
 * chegavam à mesma conclusão errada: com a API a devolver 500, a lista vinha
 * vazia, `isEmpty` dava `true`, e o ecrã anunciava "não há nada" sobre dados
 * que existem. "Não há nada" e "não consegui saber" são factos diferentes e
 * não podem partilhar o mesmo ecrã.
 *
 * A precedência é a regra toda: `error` ganha sempre a `empty`, porque uma
 * lista vazia por falha não é uma lista vazia. Só o `loading` inicial passa à
 * frente do erro — enquanto a primeira resposta não chegou não há facto
 * nenhum para afirmar.
 */
export type DataViewState = "loading" | "error" | "empty" | "ready";

export interface ResolveDataViewStateOptions {
	/** Primeira carga ainda a decorrer (react-query: `isPending`). */
	isPending: boolean;
	/** A query falhou e não há dados em cache (react-query: `isError`). */
	isError: boolean;
	/** A lista devolvida não tem elementos. */
	isEmpty: boolean;
}

export function resolveDataViewState({
	isPending,
	isError,
	isEmpty,
}: ResolveDataViewStateOptions): DataViewState {
	if (isError) return "error";
	if (isPending) return "loading";
	if (isEmpty) return "empty";
	return "ready";
}

/**
 * Um número agregado só pode ser mostrado quando foi mesmo calculado.
 *
 * Os indicadores do inventário (Total, Mínimo Crítico, ...) faziam
 * `rawStats?.total ?? 0` — com a API em baixo mostravam quatro zeros, que é
 * uma segunda afirmação falsa, independente da lista vazia. Zero é um valor
 * legítimo; ausência de resposta não é zero.
 */
export const METRIC_UNAVAILABLE = "—";

export function formatMetricValue<T extends string | number>(
	value: T | null | undefined,
	options: { isError?: boolean; isLoading?: boolean } = {}
): T | typeof METRIC_UNAVAILABLE | null {
	if (options.isLoading) return null;
	if (options.isError || value === null || value === undefined) return METRIC_UNAVAILABLE;
	return value;
}
