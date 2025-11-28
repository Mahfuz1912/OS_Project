function cloneProcs(processes) {
  return processes.map(p => ({ ...p }))
}

export function simulateFCFS(processes) {
  const procs = cloneProcs(processes).sort((a,b) => a.arrival - b.arrival || a.name.localeCompare(b.name))
  const gantt = []
  const summary = []
  let time = 0
  let busy = 0

  for (const p of procs) {
    if (time < p.arrival) {
      // idle
      gantt.push({ name: 'Idle', start: time, end: p.arrival, color: '#e5e7eb' })
      time = p.arrival
    }
    gantt.push({ name: p.name, start: time, end: time + p.burst, color: p.color || '#93c5fd' })
    const waiting = time - p.arrival
    const turnaround = waiting + p.burst
    summary.push({ id: p.id, name: p.name, arrival: p.arrival, burst: p.burst, waiting, turnaround, color: p.color })
    time += p.burst
    busy += p.burst
  }

  const totals = {
    totalWaiting: summary.reduce((s, x) => s + x.waiting, 0),
    totalTurnaround: summary.reduce((s, x) => s + x.turnaround, 0)
  }

  return { gantt, summary, totalTime: time, totals, busyTime: busy }
}

export function simulateSJF(processes) {
  // non-preemptive SJF
  const procs = cloneProcs(processes).map(p => ({ ...p }))
  const gantt = []
  const summary = []
  let time = 0
  let completed = 0
  let busy = 0
  const n = procs.length
  const done = new Set()

  while (completed < n) {
    // find available
    const available = procs.filter(p => p.arrival <= time && !done.has(p.id))
    if (!available.length) {
      // jump to next arrival
      const next = procs.filter(p => !done.has(p.id)).sort((a,b)=> a.arrival - b.arrival)[0]
      if (!next) break
      gantt.push({ name: 'Idle', start: time, end: next.arrival, color: '#e5e7eb' })
      time = next.arrival
      continue
    }
    available.sort((a,b) => a.burst - b.burst || a.arrival - b.arrival)
    const cur = available[0]
    gantt.push({ name: cur.name, start: time, end: time + cur.burst, color: cur.color || '#fca5a5' })
    const waiting = time - cur.arrival
    const turnaround = waiting + cur.burst
    summary.push({ id: cur.id, name: cur.name, arrival: cur.arrival, burst: cur.burst, waiting, turnaround, color: cur.color })
    time += cur.burst
    busy += cur.burst
    done.add(cur.id)
    completed++
  }

  const totals = {
    totalWaiting: summary.reduce((s, x) => s + x.waiting, 0),
    totalTurnaround: summary.reduce((s, x) => s + x.turnaround, 0)
  }

  return { gantt, summary, totalTime: time, totals, busyTime: busy }
}

export function simulateRR(processes, quantum = 2) {
  const procs = processes.map(p => ({ ...p, remaining: p.burst }))
  const gantt = []
  const n = procs.length

  let time = 0
  let completed = 0
  let busy = 0

  const queue = []
  const arrivedSet = new Set()

  function enqueueArrivals() {
    procs.forEach(p => {
      if (p.arrival <= time && !arrivedSet.has(p.id) && p.remaining > 0) {
        queue.push(p.id)
        arrivedSet.add(p.id)
      }
    })
  }

  while (completed < n) {
    // যদি queue খালি হয়, তাহলে next arrival এ jump কর
    if (queue.length === 0) {
      const next = procs
        .filter(p => p.remaining > 0)
        .sort((a, b) => a.arrival - b.arrival)[0]

      if (!next) break

      if (time < next.arrival) {
        gantt.push({
          name: 'Idle',
          start: time,
          end: next.arrival,
          color: '#e5e7eb'
        })
        time = next.arrival
      }
    }

    // সময় অনুযায়ী নতুন arrival ঢোকাও
    enqueueArrivals()

    const pid = queue.shift()
    const p = procs.find(x => x.id === pid)
    if (!p) continue

    const use = Math.min(quantum, p.remaining)

    gantt.push({
      name: p.name,
      start: time,
      end: time + use,
      color: p.color || '#93c5fd'
    })

    p.remaining -= use
    time += use
    busy += use

    // সময় বাড়ার পরে আবার incoming arrivals ঢোকাও
    enqueueArrivals()

    if (p.remaining > 0) {
      queue.push(p.id)
    } else {
      completed++
    }
  }

  // Summary calculate
  const summary = procs.map(p => {
    const last = gantt.slice().reverse().find(g => g.name === p.name)
    const completion = last ? last.end : p.arrival
    const turnaround = completion - p.arrival
    const waiting = turnaround - p.burst

    return {
      id: p.id,
      name: p.name,
      arrival: p.arrival,
      burst: p.burst,
      waiting,
      turnaround,
      color: p.color
    }
  })

  const totals = {
    totalWaiting: summary.reduce((s, x) => s + x.waiting, 0),
    totalTurnaround: summary.reduce((s, x) => s + x.turnaround, 0)
  }

  return {
    gantt,
    summary,
    totalTime: gantt.length ? gantt[gantt.length - 1].end : 0,
    totals,
    busyTime: busy
  }
}
// ========== SRTF (Shortest Remaining Time First - Preemptive) ==========
export function simulateSRTF(processes) {
  const procs = cloneProcs(processes).map(p => ({
    ...p,
    remaining: p.burst,
    completion: 0
  }))

  const gantt = []
  let time = 0
  let completed = 0
  let busy = 0
  const n = procs.length

  let current = null
  let segmentStart = 0

  while (completed < n) {
    // arrival হয়েছে এমন process গুলো বের করি
    const available = procs.filter(p => p.arrival <= time && p.remaining > 0)

    // যদি কিছু না পাওয়া যায়, idle দাও
    if (available.length === 0) {
      const nextArrival = Math.min(
        ...procs.filter(p => p.remaining > 0).map(p => p.arrival)
      )

      gantt.push({
        name: "Idle",
        start: time,
        end: nextArrival,
        color: "#e5e7eb"
      })

      time = nextArrival
      continue
    }

    // Shortest remaining time যেটার কম
    available.sort((a, b) => a.remaining - b.remaining || a.arrival - b.arrival)
    const shortest = available[0]

    // process change হলে আগের segment close কর
    if (!current || current.id !== shortest.id) {
      if (current) {
        gantt.push({
          name: current.name,
          start: segmentStart,
          end: time,
          color: current.color || "#86efac"
        })
      }
      current = shortest
      segmentStart = time
    }

    // ১ time unit execute
    current.remaining--
    time++
    busy++

    // শেষ হয়ে গেলে complete mark কর
    if (current.remaining === 0) {
      current.completion = time
      completed++

      gantt.push({
        name: current.name,
        start: segmentStart,
        end: time,
        color: current.color || "#86efac"
      })

      current = null
    }
  }

  // Summary calculation
  const summary = procs.map(p => {
    const turnaround = p.completion - p.arrival
    const waiting = turnaround - p.burst

    return {
      id: p.id,
      name: p.name,
      arrival: p.arrival,
      burst: p.burst,
      waiting,
      turnaround,
      color: p.color
    }
  })

  const totals = {
    totalWaiting: summary.reduce((s, x) => s + x.waiting, 0),
    totalTurnaround: summary.reduce((s, x) => s + x.turnaround, 0)
  }

  return {
    gantt,
    summary,
    totalTime: time,
    totals,
    busyTime: busy
  }
}
