import { motion } from 'framer-motion'

export default function DynamicBackground() {
  return (
    <div className="dynamic-bg" aria-hidden="true">
      <motion.div
        className="dynamic-bg-layer dynamic-bg-layer-one"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          scale: [1, 1.07, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="dynamic-bg-layer dynamic-bg-layer-two"
        animate={{
          backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
          opacity: [0.35, 0.65, 0.35],
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
