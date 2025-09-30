import React from "react";

const predefinedEmojis = [
  // Snack / Restauration
  "🍕",
  "🍔",
  "🍟",
  "🌭",
  "🌮",
  "🥗",
  "🍰",
  "🍦",
  "🍿",
  "☕",
  "🥤",
  "🍺",
  "🍷",
  "🥪",
  "🧃",

  // Camping & Activités
  "🏕️",
  "🔥",
  "🎣",
  "🛶",
  "🚴‍♂️",
  "🏓",
  "⚽",
  "🏀",
  "🏐",
  "🏆",
  "🎸",
  "🎶",
  "✨",
  "🎉",
  "🧗",
  "🎯",

  // Mer / Plage / Piscine
  "🏖️",
  "🏊‍♂️",
  "🤽",
  "🩱",
  "🩳",
  "🚤",
  "⛵",
  "🌅",
  "💦",
  "🧴",

  // Vie du camping
  "🌞",
  "🌙",
  "🌧️",
  "🌊",
  "🐕",
  "🛒",
  "🎡",
  "🚿",
];

export default function EmojiPicker({
  onSelect,
}: {
  onSelect: (emoji: string) => void;
}) {
  return (
    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1">
      {predefinedEmojis.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect(emoji)}
          className="text-lg sm:text-xl p-1 rounded border border-gray-200 hover:bg-gray-100 transition"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
