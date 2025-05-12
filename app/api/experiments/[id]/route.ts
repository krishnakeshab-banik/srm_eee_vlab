import { NextResponse } from "next/server"

// Updated experiments with all Tinkercad embed IDs
const experiments = [
  {
    id: 1,
    title: "Kirchhoff's Voltage Law",
    description: "Understand the relationship between voltages in a closed loop circuit",
    embedId: "hNWAhAfShmV",
    aim: "To verify Kirchhoff's Voltage Law in a closed loop circuit.",
    completed: 0,
    totalStudents: 0,
  },
  {
    id: 2,
    title: "Thevenin's Theorem",
    description: "Learn about equivalent circuit simplification techniques",
    embedId: "lAusQJ3m4bF",
    aim: "To verify Thevenin's Theorem by constructing an equivalent circuit and comparing its behavior with the original circuit.",
    completed: 0,
    totalStudents: 0,
  },
  {
    id: 3,
    title: "House Wiring",
    description: "Explore residential electrical wiring systems and safety",
    embedId: "2rTQ63Z8SdD",
    aim: "To understand and implement basic residential electrical wiring systems with proper safety measures.",
    completed: 0,
    totalStudents: 0,
  },
  {
    id: 4,
    title: "Fluorescent Lamp Wiring",
    description: "Study the wiring and operation of fluorescent lighting systems",
    embedId: "hnFoQc772H0",
    aim: "To understand and implement the wiring of fluorescent lighting systems with different types of ballasts.",
    completed: 0,
    totalStudents: 0,
  },
  {
    id: 5,
    title: "Staircase Wiring",
    description: "Understand multi-way switching for staircase lighting control",
    embedId: "94YWeHFB9oN",
    aim: "To implement and understand multi-way switching circuits for controlling lights from multiple locations.",
    completed: 0,
    totalStudents: 0,
  },
  {
    id: 6,
    title: "Full Wave Rectifier",
    description: "Learn about AC to DC conversion using full wave rectification",
    embedId: "jbRQbeSnAzj",
    aim: "To construct and analyze the operation of a full wave bridge rectifier circuit with and without filtering.",
    completed: 0,
    totalStudents: 0,
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  // Find the experiment by ID
  const experiment = experiments.find((exp) => exp.id === id)

  if (!experiment) {
    return NextResponse.json({ error: "Experiment not found" }, { status: 404 })
  }

  return NextResponse.json(experiment)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()

    // Find the experiment by ID
    const experimentIndex = experiments.findIndex((exp) => exp.id === id)

    if (experimentIndex === -1) {
      return NextResponse.json({ error: "Experiment not found" }, { status: 404 })
    }

    // Update the experiment (in a real app, this would update a database)
    const updatedExperiment = {
      ...experiments[experimentIndex],
      ...data,
      id, // Ensure ID doesn't change
    }

    experiments[experimentIndex] = updatedExperiment

    return NextResponse.json(updatedExperiment)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  // Find the experiment by ID
  const experimentIndex = experiments.findIndex((exp) => exp.id === id)

  if (experimentIndex === -1) {
    return NextResponse.json({ error: "Experiment not found" }, { status: 404 })
  }

  // Remove the experiment (in a real app, this would update a database)
  const deletedExperiment = experiments[experimentIndex]
  experiments.splice(experimentIndex, 1)

  return NextResponse.json(deletedExperiment)
}

