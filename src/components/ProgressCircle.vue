<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    default: 68,
    validator: (value) => value >= 0 && value <= 100
  }
})

const liquidEl = ref(null)
const liquidAnimationId = ref(null)

const VIEWBOX_WIDTH = 200
const VIEWBOX_HEIGHT = 120
const WAVE_CYCLE_WIDTH = VIEWBOX_WIDTH
const waveAmplitude = 10
const midY = 30
const ANIMATION_SPEED = 0.07

const fillRatio = props.percentage / 100
const maxTranslate = VIEWBOX_HEIGHT
const verticalTranslateY = Math.round((1 - fillRatio) * maxTranslate)

const createWavyPath = () => {
  const cycleWidth = WAVE_CYCLE_WIDTH
  let path = `M 0 ${midY}`
  
  // Cycle 1
  path += `C ${cycleWidth * 0.25} ${midY + waveAmplitude} ${cycleWidth * 0.5} ${midY - waveAmplitude} ${cycleWidth * 0.5} ${midY}`
  path += `C ${cycleWidth * 0.75} ${midY + waveAmplitude} ${cycleWidth} ${midY - waveAmplitude} ${cycleWidth} ${midY}`
  
  // Cycle 2
  path += `C ${cycleWidth * 1.25} ${midY + waveAmplitude} ${cycleWidth * 1.5} ${midY - waveAmplitude} ${cycleWidth * 1.5} ${midY}`
  path += `C ${cycleWidth * 1.75} ${midY + waveAmplitude} ${cycleWidth * 2} ${midY - waveAmplitude} ${cycleWidth * 2} ${midY}`
  
  // Close path
  path += `L ${WAVE_CYCLE_WIDTH * 2} ${VIEWBOX_HEIGHT}`
  path += `L 0 ${VIEWBOX_HEIGHT}`
  path += `Z`
  
  return path
}

const wavyPath = createWavyPath()

const animateLiquid = (time) => {
  const liquidGroup = liquidEl.value?.querySelector('#liquid-group')
  if (!liquidGroup) return
  
  const timeOffset = time * ANIMATION_SPEED
  const translateX = -((timeOffset % WAVE_CYCLE_WIDTH) * 1)
  
  liquidGroup.setAttribute('transform', `translate(${translateX}, ${verticalTranslateY})`)
  liquidAnimationId.value = requestAnimationFrame(animateLiquid)
}

onMounted(() => {
  setTimeout(() => {
    liquidAnimationId.value = requestAnimationFrame(animateLiquid)
  }, 160)
})

onUnmounted(() => {
  if (liquidAnimationId.value) {
    cancelAnimationFrame(liquidAnimationId.value)
  }
})
</script>

<template>
  <div class="circle">
    <div class="liquid-mask">
      <div class="liquid" ref="liquidEl">
        <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#d4a3ff;stop-opacity:0.92" />
              <stop offset="100%" style="stop-color:#9F35FF;stop-opacity:1" />
            </linearGradient>
          </defs>
          <g id="liquid-group">
            <path :d="wavyPath" fill="url(#liquidGradient)" />
          </g>
        </svg>
      </div>
    </div>
    <span class="percent">{{ percentage }}%</span>
  </div>
</template>

<style scoped>
.circle {
  position: relative;
  width: 102px;
  height: 102px;
  border-radius: 50%;
  background: linear-gradient(180deg, #ffffff 0%, #f2f4ff 65%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  box-sizing: border-box;
  box-shadow: inset 0 6px 18px rgba(255, 255, 255, 0.6),
    0 18px 36px rgba(75, 45, 140, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.45);
}

.circle::before {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: linear-gradient(145deg, rgba(159, 53, 255, 0.3), rgba(159, 53, 255, 0.05));
  z-index: -1;
}

.circle::after {
  content: '';
  position: absolute;
  left: 8%;
  bottom: 6%;
  width: 84%;
  height: 22%;
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0)
  );
  pointer-events: none;
}

.liquid-mask {
  position: absolute;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  background: transparent;
  box-shadow: inset 0 -8px 18px rgba(0, 0, 0, 0.04);
}

.liquid {
  position: relative;
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 0;
  transition: none;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.liquid svg {
  display: block;
  width: 100%;
  height: 100%;
  shape-rendering: geometricPrecision;
  will-change: transform, opacity;
}

.percent {
  position: absolute;
  z-index: 6;
  font-weight: 800;
  font-size: 1.75rem;
  color: #1b1030;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.06);
  pointer-events: none;
  transform: translateY(-2px);
}
</style>
