'use client';

import { useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { SectionKey, Tier, DEFAULT_SECTION_ORDER } from './types';

// Define drag item type
interface DragItem {
  index: number;
  id: string;
  type: string;
}

// Define section metadata
interface SectionMetadata {
  key: SectionKey;
  label: string;
  description: string;
  icon: string;
}

// Section labels and metadata
const SECTION_METADATA: SectionMetadata[] = [
  { key: 'hero', label: 'Hero Section', description: 'Name, headshot, bio', icon: '⭐' },
  { key: 'headshots', label: 'Headshots Gallery', description: 'Professional photos', icon: '📸' },
  { key: 'reels', label: 'Video Reels', description: 'Video clips and demos', icon: '🎬' },
  { key: 'bts', label: 'Behind-the-Scenes', description: 'On-set photos (Standard+)', icon: '🎭' },
  { key: 'projects', label: 'Projects Gallery', description: 'Film/TV/Theatre (Premium)', icon: '🎪' },
  { key: 'resume', label: 'Resume', description: 'Credits and experience', icon: '📋' },
  { key: 'contact', label: 'Contact Info', description: 'How to reach you', icon: '📧' },
];

interface DraggableSectionItemProps {
  sectionKey: SectionKey;
  index: number;
  disabled: boolean;
  moveSection: (dragIndex: number, hoverIndex: number) => void;
}

function DraggableSectionItem({ sectionKey, index, disabled, moveSection }: DraggableSectionItemProps) {
  const metadata = SECTION_METADATA.find((m) => m.key === sectionKey);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'section',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!disabled && item.index !== index) {
        const dragIndex = item.index;
        const hoverIndex = index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        moveSection(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'section',
    item: () => {
      return { id: sectionKey, index };
    },
    canDrag: !disabled,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Connect the drag and drop refs
  drag(dragHandleRef);
  drop(dragPreview(previewRef));

  const opacity = isDragging ? 0.4 : 1;
  const cursor = disabled ? 'not-allowed' : 'move';

  return (
    <div
      ref={previewRef}
      style={{ opacity }}
      data-handler-id={handlerId}
      className={`
        flex items-center gap-3 p-4 bg-slate-800 rounded-lg border border-slate-700
        ${disabled ? 'opacity-60' : 'hover:bg-slate-750 hover:border-indigo-500/50'}
        transition-all
      `}
    >
      {/* Drag handle */}
      <div
        ref={dragHandleRef}
        style={{ cursor }}
        className={`
          flex items-center justify-center w-8 h-8 rounded
          ${disabled ? 'bg-slate-700 text-slate-500' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}
        `}
      >
        {disabled ? '🔒' : '⋮⋮'}
      </div>

      {/* Icon */}
      <div className="text-2xl">{metadata?.icon || '📄'}</div>

      {/* Label and description */}
      <div className="flex-1">
        <div className="font-medium text-white">{metadata?.label || sectionKey}</div>
        <div className="text-sm text-slate-400">{metadata?.description || ''}</div>
      </div>

      {/* Order number */}
      <div className="text-sm text-slate-500 font-mono">#{index + 1}</div>
    </div>
  );
}

interface SectionReorderListProps {
  sectionOrder: SectionKey[];
  tier: Tier;
  onChange: (newOrder: SectionKey[]) => void;
}

export default function SectionReorderList({ sectionOrder, tier, onChange }: SectionReorderListProps) {
  const isDisabled = tier === 'free';

  const moveSection = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (isDisabled) return;

      const newOrder = [...sectionOrder];
      const [draggedItem] = newOrder.splice(dragIndex, 1);
      newOrder.splice(hoverIndex, 0, draggedItem);
      onChange(newOrder);
    },
    [sectionOrder, onChange, isDisabled]
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Section Order</h3>
          <p className="text-sm text-slate-400 mt-1">
            {isDisabled
              ? 'Upgrade to Standard or Premium to customize section order'
              : 'Drag sections to reorder how they appear on your page'}
          </p>
        </div>

        {/* Reset button */}
        {!isDisabled && (
          <button
            type="button"
            onClick={() => onChange(DEFAULT_SECTION_ORDER)}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Reset to Default
          </button>
        )}
      </div>

      {/* Tier gate message */}
      {isDisabled && (
        <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <h4 className="font-medium text-indigo-300">Premium Feature</h4>
              <p className="text-sm text-slate-300 mt-1">
                Reorder sections with drag-and-drop when you upgrade to Standard ($12/mo) or Premium ($20/mo).
              </p>
              <button
                type="button"
                className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
                onClick={() => {
                  // TODO: Link to upgrade flow
                  alert('Upgrade flow coming soon!');
                }}
              >
                Upgrade Your Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section list */}
      <div className="space-y-2">
        {sectionOrder.map((sectionKey, index) => (
          <DraggableSectionItem
            key={sectionKey}
            sectionKey={sectionKey}
            index={index}
            disabled={isDisabled}
            moveSection={moveSection}
          />
        ))}
      </div>

      {/* Help text */}
      {!isDisabled && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
          <p className="text-xs text-slate-400">
            💡 <strong>Tip:</strong> Hero section is always first. Only published sections will appear on your page.
          </p>
        </div>
      )}
    </div>
  );
}
