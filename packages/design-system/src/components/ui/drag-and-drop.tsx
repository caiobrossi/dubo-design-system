"use client";

import * as React from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";

export interface DragAndDropCardsItem {
  id: string;
}

export type DragAndDropCardsOrientation = "vertical" | "horizontal";
export type DragAndDropCardsHandlePosition = "start" | "end";

export interface DragAndDropCardsRenderState {
  isDragging: boolean;
  dragHandle: React.ReactNode;
}

export interface DragAndDropCardsProps<TItem extends DragAndDropCardsItem>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: TItem[];
  onReorder: (items: TItem[]) => void;
  renderItem: (item: TItem, state: DragAndDropCardsRenderState) => React.ReactNode;
  ariaLabel?: string;
  orientation?: DragAndDropCardsOrientation;
  handlePosition?: DragAndDropCardsHandlePosition;
  disabled?: boolean;
  itemVariant?: "card" | "bare";
  itemClassName?: string;
  getItemLabel?: (item: TItem) => string;
}

interface SortableCardItemProps<TItem extends DragAndDropCardsItem> {
  item: TItem;
  renderItem: (item: TItem, state: DragAndDropCardsRenderState) => React.ReactNode;
  disabled: boolean;
  itemVariant: "card" | "bare";
  itemClassName?: string;
  handlePosition: DragAndDropCardsHandlePosition;
  getItemLabel?: (item: TItem) => string;
}

function SortableCardItem<TItem extends DragAndDropCardsItem>({
  item,
  renderItem,
  disabled,
  itemVariant,
  itemClassName,
  handlePosition,
  getItemLabel,
}: SortableCardItemProps<TItem>) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled,
  });

  const dragHandle = (
    <button
      type="button"
      aria-label={`Drag ${getItemLabel?.(item) ?? item.id}`}
      className={cn(
        "mt-[2px] shrink-0 rounded-full p-[var(--space-1)]",
        "text-[color:var(--color-text-muted)] outline-none",
        "transition-colors duration-[var(--transition-fast)]",
        "[transition-timing-function:var(--transition-easing)]",
        !disabled && "cursor-grab hover:bg-[var(--color-hover)] active:cursor-grabbing",
        disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-surface)]"
      )}
      onClick={(event) => event.stopPropagation()}
      {...attributes}
      {...listeners}
      disabled={disabled}
    >
      <GripVertical className="size-[var(--icon-size-md)]" />
    </button>
  );

  if (itemVariant === "bare") {
    return (
      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        className={cn(isDragging && "opacity-90", disabled && "opacity-[var(--disabled-opacity)]", itemClassName)}
      >
        {renderItem(item, { isDragging, dragHandle })}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        "flex min-w-0 items-start gap-[var(--space-3)] rounded-[var(--radius-scale-2xl)] border",
        "border-[var(--color-border)] bg-[var(--color-bg-surface)] px-[var(--space-4)] py-[var(--space-4)]",
        "text-[color:var(--color-text-primary)] shadow-[var(--shadow-sm)]",
        "transition-[transform,box-shadow,border-color,background-color,opacity]",
        "duration-[var(--transition-fast)] [transition-timing-function:var(--transition-easing)]",
        isDragging && [
          "z-10 border-[var(--color-brand)] bg-[var(--color-brand-subtle)]",
          "shadow-[var(--shadow-lg)] opacity-90",
        ],
        disabled && "opacity-[var(--disabled-opacity)]",
        itemClassName
      )}
    >
      {handlePosition === "start" ? dragHandle : null}
      <div className="min-w-0 flex-1">{renderItem(item, { isDragging, dragHandle })}</div>
      {handlePosition === "end" ? dragHandle : null}
    </div>
  );
}

export function DragAndDropCards<TItem extends DragAndDropCardsItem>({
  items,
  onReorder,
  renderItem,
  ariaLabel = "Sortable cards",
  orientation = "vertical",
  handlePosition = "start",
  disabled = false,
  itemVariant = "card",
  className,
  itemClassName,
  getItemLabel,
  ...props
}: DragAndDropCardsProps<TItem>) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      if (oldIndex < 0 || newIndex < 0) return;

      onReorder(arrayMove(items, oldIndex, newIndex));
    },
    [items, onReorder]
  );

  const strategy =
    orientation === "horizontal" ? horizontalListSortingStrategy : verticalListSortingStrategy;

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={strategy}>
        <div
          role="list"
          aria-label={ariaLabel}
          className={cn(
            orientation === "horizontal"
              ? "flex items-stretch gap-[var(--space-3)] overflow-x-auto pb-[var(--space-2)]"
              : "flex flex-col gap-[var(--space-3)]",
            className
          )}
          {...props}
        >
          {items.map((item) => (
            <SortableCardItem
              key={item.id}
              item={item}
              renderItem={renderItem}
              disabled={disabled}
              itemVariant={itemVariant}
              itemClassName={itemClassName}
              handlePosition={handlePosition}
              getItemLabel={getItemLabel}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export type DragAndDropItem = DragAndDropCardsItem;
export type DragAndDropOrientation = DragAndDropCardsOrientation;
export type DragAndDropHandlePosition = DragAndDropCardsHandlePosition;
export type DragAndDropRenderState = DragAndDropCardsRenderState;
export type DragAndDropProps<TItem extends DragAndDropItem> = DragAndDropCardsProps<TItem>;

export const DragAndDrop = DragAndDropCards;
