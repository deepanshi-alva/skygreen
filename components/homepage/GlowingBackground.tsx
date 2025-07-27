import styles from '../../public/styles/GlowingBackground.module.css';

// Colors for bubbles
const COLORS = [
  "rgba(80,255,100,0.7)",
  "rgba(0,220,255,0.6)",
  "rgba(255,75,255,0.7)",
  "rgba(255,255,100,0.6)",
  "rgba(255,50,50,0.5)",
  "rgba(120,120,255,0.6)",
  "rgba(0,255,190,0.5)",
];

const BUBBLES = [
  [ '10%', '15%', 320, 0 ],
  [ '55%', '18%', 260, 1 ],
  [ '25%', '65%', 360, 2 ],
  [ '70%', '70%', 240, 3 ],
  [ '60%', '50%', 230, 4 ],
  [ '20%', '45%', 200, 5 ],
  [ '42%', '75%', 280, 6 ],
];

export default function GlowingBubbles() {
  return (
    <div className={styles.bubbleContainer}>
      {BUBBLES.map(([top, left, size, colorIdx], i) => (
        <div
          key={i}
          className={`${styles.bubble} ${styles[`bubble${i}`]}`}
          style={{
            top,
            left,
            width: size,
            height: size,
            color: COLORS[colorIdx as number],    // <--- use 'color'
            background: COLORS[colorIdx as number],
          }}
        />
      ))}
    </div>
  );
}