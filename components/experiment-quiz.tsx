"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, HelpCircle, ChevronRight, RotateCcw } from "lucide-react"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface ExperimentQuizProps {
  experimentId: number
  title: string
  questions: QuizQuestion[]
}

export const ExperimentQuiz = ({ experimentId, title, questions }: ExperimentQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return
    
    setSelectedOption(optionIndex)
    setIsAnswered(true)
    
    // Update answers array
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)
    
    // Update score if correct
    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(answers[currentQuestion + 1])
      setIsAnswered(answers[currentQuestion + 1] !== null)
    } else {
      setShowResults(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setShowResults(false)
    setAnswers(Array(questions.length).fill(null))
  }

  return (
    <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
      <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-4 border-b border-neutral-800">
        <h3 className="text-xl font-bold text-white">{title} - Knowledge Check</h3>
      </div>
      
      <div className="p-6">
        {!showResults ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-neutral-400">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-neutral-400">Score: {score}/{questions.length}</span>
                <div className="w-32 h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500"
                    style={{ width: `${(score / questions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4">{questions[currentQuestion].question}</h4>
                  
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                          selectedOption === index
                            ? isAnswered && index === questions[currentQuestion].correctAnswer
                              ? "border-green-500 bg-green-900/20"
                              : isAnswered && index !== questions[currentQuestion].correctAnswer
                              ? "border-red-500 bg-red-900/20"
                              : "border-blue-500 bg-blue-900/20"
                            : "border-neutral-700 hover:border-neutral-600 bg-neutral-800/50"
                        }`}
                        onClick={() => handleOptionSelect(index)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-200">{option}</span>
                          {isAnswered && (
                            <>
                              {index === questions[currentQuestion].correctAnswer ? (
                                <Check className="h-5 w-5 text-green-500" />
                              ) : selectedOption === index ? (
                                <X className="h-5 w-5 text-red-500" />
                              ) : null}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 p-4 rounded-lg bg-neutral-800 border border-neutral-700"
                  >
                    <div className="flex items-start space-x-3">
                      <HelpCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Explanation</h5>
                        <p className="text-neutral-300 text-sm">{questions[currentQuestion].explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    disabled={!isAnswered}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isAnswered
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    }`}
                  >
                    <span>{currentQuestion === questions.length - 1 ? "See Results" : "Next Question"}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-white mb-2">Quiz Results</h4>
              <p className="text-neutral-400">You scored {score} out of {questions.length}</p>
              
              <div className="w-full h-4 bg-neutral-800 rounded-full overflow-hidden mt-4 mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-green-500"
                  style={{ width: `${(score / questions.length) * 100}%` }}
                />
              </div>
              
              <p className="text-sm text-neutral-400">
                {score === questions.length
                  ? "Perfect! You've mastered this topic."
                  : score >= questions.length * 0.7
                  ? "Great job! You have a good understanding of the material."
                  : score >= questions.length * 0.5
                  ? "Good effort! Review the topics you missed to improve your knowledge."
                  : "Keep studying! Review the material and try again."}
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <h5 className="font-semibold text-white">Question Summary:</h5>
              {questions.map((question, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    {answers[index] === question.correctAnswer ? (
                      <div className="h-6 w-6 rounded-full bg-green-900/30 flex items-center justify-center">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-red-900/30 flex items-center justify-center">
                        <X className="h-4 w-4 text-red-500" />
                      </div>
                    )}
                    <span className="text-sm text-neutral-300 truncate max-w-md">
                      {question.question}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400">
                    {answers[index] !== null ? (
                      answers[index] === question.correctAnswer ? (
                        "Correct"
                      ) : (
                        "Incorrect"
                      )
                    ) : (
                      "Unanswered"
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={resetQuiz}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Predefined quizzes for experiments
export const KVLQuiz = () => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What does Kirchhoff's Voltage Law (KVL) state?",
      options: [
        "The sum of all currents entering a node equals the sum of all currents leaving the node",
        "The sum of all voltages around any closed loop in a circuit must equal zero",
        "The voltage across a resistor is proportional to the current flowing through it",
        "The total resistance of resistors in series is the sum of their individual resistances"
      ],
      correctAnswer: 1,
      explanation: "Kirchhoff's Voltage Law (KVL) states that the sum of all voltages around any closed loop in a circuit must equal zero. This is based on the principle of conservation of energy."
    },
    {
      id: 2,
      question: "In a series circuit with a 12V battery and two resistors having voltage drops of 5V and 7V respectively, does KVL hold true?",
      options: [
        "No, because 5V + 7V = 12V, not 0V",
        "Yes, because 12V - 5V - 7V = 0V",
        "No, because the resistors should have equal voltage drops",
        "Yes, because the current is the same through all components"
      ],
      correctAnswer: 1,
      explanation: "KVL holds true because when we consider the voltage rise from the battery (+12V) and the voltage drops across the resistors (-5V and -7V), the algebraic sum is 12V - 5V - 7V = 0V."
    },
    {
      id: 3,
      question: "What is the correct way to apply KVL in a circuit analysis?",
      options: [
        "Add all voltages with their original polarities",
        "Subtract all voltage drops from all voltage sources",
        "Assign + for voltage rises and - for voltage drops, then sum all voltages",
        "Multiply all voltages by the current flowing through them"
      ],
      correctAnswer: 2,
      explanation: "When applying KVL, you assign positive values to voltage rises (from sources) and negative values to voltage drops (across loads), then sum all these voltages. The total should equal zero."
    },
    {
      id: 4,
      question: "If you have a circuit with a 9V battery and three resistors in series, what must be true according to KVL?",
      options: [
        "Each resistor must have a 3V voltage drop",
        "The sum of the voltage drops across all resistors must equal 9V",
        "The current through each resistor must be the same",
        "The resistors must have equal resistance values"
      ],
      correctAnswer: 1,
      explanation: "According to KVL, the sum of the voltage drops across all resistors must equal the voltage of the battery (9V). The individual voltage drops depend on the resistance values and don't need to be equal."
    },
    {
      id: 5,
      question: "Why is KVL important in circuit analysis?",
      options: [
        "It helps determine the power consumption of a circuit",
        "It allows us to calculate unknown voltages in complex circuits",
        "It's used to design power supplies",
        "It helps determine the efficiency of a circuit"
      ],
      correctAnswer: 1,
      explanation: "KVL is important because it allows us to calculate unknown voltages in complex circuits by setting up equations based on the principle that the sum of voltages around any closed loop must equal zero."
    }
  ]

  return <ExperimentQuiz experimentId={1} title="Kirchhoff's Voltage Law" questions={questions} />
}

export const TheveninQuiz = () => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What does Thevenin's Theorem allow us to do?",
      options: [
        "Replace a complex circuit with a simple equivalent circuit",
        "Calculate the total power in a circuit",
        "Determine the frequency response of a circuit",
        "Analyze non-linear circuits"
      ],
      correctAnswer: 0,
      explanation: "Thevenin's Theorem allows us to replace any linear circuit with voltage and current sources by an equivalent circuit consisting of a single voltage source in series with a single resistor."
    },
    {
      id: 2,
      question: "What are the two components of a Thevenin equivalent circuit?",
      options: [
        "A current source and a resistor in parallel",
        "A voltage source and a resistor in parallel",
        "A voltage source and a resistor in series",
        "Two voltage sources in series"
      ],
      correctAnswer: 2,
      explanation: "A Thevenin equivalent circuit consists of a voltage source (Thevenin voltage, VTH) in series with a resistor (Thevenin resistance, RTH)."
    },
    {
      id: 3,
      question: "How do you find the Thevenin voltage (VTH)?",
      options: [
        "Measure the short-circuit current at the load terminals",
        "Measure the open-circuit voltage across the load terminals",
        "Divide the total power by the current",
        "Multiply the load resistance by the current"
      ],
      correctAnswer: 1,
      explanation: "The Thevenin voltage (VTH) is found by measuring the open-circuit voltage across the load terminals, with the load removed from the circuit."
    },
    {
      id: 4,
      question: "How do you find the Thevenin resistance (RTH)?",
      options: [
        "Divide the open-circuit voltage by the short-circuit current",
        "Measure the resistance of the load",
        "Replace all independent sources with their internal resistances and measure the equivalent resistance looking back into the circuit",
        "Add all resistances in the circuit"
      ],
      correctAnswer: 2,
      explanation: "To find the Thevenin resistance (RTH), you replace all independent sources with their internal resistances (voltage sources as short circuits, current sources as open circuits) and measure the equivalent resistance looking back into the circuit from the load terminals."
    },
    {
      id: 5,
      question: "What is the main advantage of using Thevenin's Theorem?",
      options: [
        "It works for all types of circuits, including non-linear ones",
        "It simplifies circuit analysis, especially when analyzing the effect of different loads",
        "It increases the accuracy of measurements",
        "It reduces the power consumption of the circuit"
      ],
      correctAnswer: 1,
      explanation: "The main advantage of Thevenin's Theorem is that it simplifies circuit analysis, especially when analyzing the effect of different loads on a circuit. Once you have the Thevenin equivalent, you can easily calculate the behavior with any load without redoing the entire analysis."
    }
  ]

  return <ExperimentQuiz experimentId={2} title="Thevenin's Theorem" questions={questions} />
}

export const HouseWiringQuiz = () => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the purpose of an energy meter in house wiring?",
      options: [
        "To regulate voltage fluctuations",
        "To measure electrical energy consumption",
        "To prevent electrical shocks",
        "To distribute power to different circuits"
      ],
      correctAnswer: 1,
      explanation: "An energy meter measures the electrical energy consumed by the household. It records the amount of electricity used in kilowatt-hours (kWh), which is used for billing purposes."
    },
    {
      id: 2,
      question: "In residential wiring, what is the function of the main distribution box?",
      options: [
        "To convert AC to DC",
        "To boost the incoming voltage",
        "To house circuit breakers or fuses that protect individual circuits",
        "To reduce electromagnetic interference"
      ],
      correctAnswer: 2,
      explanation: "The main distribution box houses circuit breakers or fuses that protect individual circuits from overload and short circuits. It's the central point where incoming power is distributed to various branch circuits in the house."
    },
    {
      id: 3,
      question: "What is the standard color for the neutral wire in many countries?",
      options: [
        "Red",
        "Black",
        "Blue or White",
        "Green"
      ],
      correctAnswer: 2,
      explanation: "The neutral wire is typically blue (in many European countries) or white/grey (in North America). Color standards may vary by country, but neutral is generally a light color like blue or white."
    },
    {
      id: 4,
      question: "What safety device should be installed in residential circuits to protect against electric shock?",
      options: [
        "Voltage stabilizer",
        "Residual Current Device (RCD) or Ground Fault Circuit Interrupter (GFCI)",
        "Surge protector",
        "Transformer"
      ],
      correctAnswer: 1,
      explanation: "Residual Current Devices (RCDs) or Ground Fault Circuit Interrupters (GFCIs) are safety devices that quickly break an electrical circuit when they detect that current is flowing along an unintended path, such as through water or a person. They are essential for preventing electric shocks."
    },
    {
      id: 5,
      question: "What is the purpose of grounding in house wiring?",
      options: [
        "To increase the voltage",
        "To provide a path for fault currents to safely flow to earth",
        "To reduce the electricity bill",
        "To increase the current flow"
      ],
      correctAnswer: 1,
      explanation: "Grounding provides a safe path for fault currents to flow to earth, preventing electric shock hazards. It helps ensure that in case of a fault, the current flows through the ground wire rather than through a person, and it also helps trip circuit breakers or blow fuses when a fault occurs."
    }
  ]

  return <ExperimentQuiz experimentId={3} title="House Wiring" questions={questions} />
}

export const FluorescentLampQuiz = () => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the function of a starter in a fluorescent lamp circuit?",
      options: [
        "To reduce the voltage",
        "To provide initial current surge to heat the electrodes",
        "To filter out harmonics",
        "To increase the brightness"
      ],
      correctAnswer: 1,
      explanation: "The starter provides an initial current surge to heat the electrodes (filaments) at the ends of the tube. This heating helps ionize the gas inside the tube, making it conductive and allowing the lamp to start."
    },
    {
      id: 2,
      question: "What is the purpose of the choke/ballast in a fluorescent lamp circuit?",
      options: [
        "To increase the current",
        "To reduce the brightness",
        "To regulate current and provide voltage spike",
        "To convert AC to DC"
      ],
      correctAnswer: 2,
      explanation: "The choke or ballast serves two main purposes: it provides a high voltage spike (around 1000V) when the starter opens, which helps initiate the arc discharge, and it then limits and regulates the current flowing through the tube during normal operation."
    },
    {
      id: 3,
      question: "What gas is primarily used inside a fluorescent tube?",
      options: [
        "Oxygen",
        "Nitrogen",
        "Mercury vapor and argon",
        "Carbon dioxide"
      ],
      correctAnswer: 2,
      explanation: "Fluorescent tubes contain mercury vapor at low pressure, along with an inert gas like argon. When electricity passes through, the mercury vapor produces ultraviolet light, which then causes the phosphor coating on the inside of the tube to emit visible light."
    },
    {
      id: 4,
      question: "What causes the visible light in a fluorescent lamp?",
      options: [
        "Direct emission from the mercury vapor",
        "Heating of the tube",
        "Phosphor coating excited by ultraviolet light",
        "Electrical arcing between electrodes"
      ],
      correctAnswer: 2,
      explanation: "The visible light in a fluorescent lamp comes from the phosphor coating on the inside of the tube. This coating is excited by ultraviolet light produced by the mercury vapor discharge, causing it to fluoresce and emit visible light."
    },
    {
      id: 5,
      question: "What is a common sign that a fluorescent tube is reaching the end of its life?",
      options: [
        "Increased brightness",
        "Darkening at the ends of the tube",
        "Change in color to more reddish light",
        "Complete silence during operation"
      ],
      correctAnswer: 1,
      explanation: "Darkening at the ends of the tube is a common sign that a fluorescent tube is reaching the end of its life. This darkening occurs because the electrodes deteriorate over time, causing some of the electrode material to be deposited on the inside of the tube."
    }
  ]

  return <ExperimentQuiz experimentId={4} title="Fluorescent Lamp Wiring" questions={questions} />
}

export const StaircaseWiringQuiz = () => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What type of switches are used in staircase wiring?",
      options: [
        "Single-pole switches",
        "Two-way switches",
        "Dimmer switches",
        "Push-button switches"
      ],
      correctAnswer: 1,
      explanation: "Staircase wiring uses two-way switches (also called three-way switches in some countries). These special switches have three terminals: one common terminal and two traveler terminals, allowing the light to be controlled from two different locations."
    },
    {
      id: 2,
      question: "How many terminals does a two-way switch have?",
      options: [
        "Two terminals",
        "Three terminals",
        "Four terminals",
        "Five terminals"
      ],
      correctAnswer: 1,
      explanation: "A two-way switch has three terminals: one common terminal and two traveler terminals. The common terminal connects to either of the two traveler terminals depending on the switch position."
    },
    {
      id: 3,
      question: "In staircase wiring, when will the lamp be ON?",
      options: [
        "When both switches are in the UP position",
        "When both switches are in the DOWN position",
        "When both switches are in the same position (either both UP or both DOWN)",
        "When one switch is UP and the other is DOWN"
      ],
      correctAnswer: 2,
      explanation: "In staircase wiring, the lamp will be ON when both switches are in the same position (either both UP or both DOWN). This creates a complete circuit path for the current to flow through the lamp."
    },
    {
      id: 4,
      question: "What is the main advantage of staircase wiring?",
      options: [
        "It reduces electricity consumption",
        "It allows control of a light from two different locations",
        "It increases the brightness of the lamp",
        "It prevents power surges"
      ],
      correctAnswer: 1,
      explanation: "The main advantage of staircase wiring is that it allows control of a light from two different locations, typically at the top and bottom of a staircase. This provides convenience and safety, as users don't need to walk in the dark to turn on or off the light."
    },
    {
      id: 5,
      question: "How are the traveler terminals of the two switches connected in staircase wiring?",
      options: [
        "In parallel with each other",
        "In series with each other",
        "Crosswise (first traveler of switch 1 to first traveler of switch 2, and second to second)",
        "To the neutral wire"
      ],
      correctAnswer: 2,
      explanation: "In staircase wiring, the traveler terminals of the two switches are connected crosswise: the first traveler terminal of switch 1 connects to the first traveler terminal of switch 2, and the second traveler terminal of switch 1 connects to the second traveler terminal of switch 2. This configuration allows either switch to control the light."
    }
  ]

  return <ExperimentQuiz experimentId={5} title="Staircase Wiring" questions={questions} />
}

export const FullWaveRectifierQuiz = () => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the main advantage of a full wave rectifier over a half wave rectifier?",
      options: [
        "It uses fewer diodes",
        "It has a lower peak inverse voltage",
        "It utilizes both halves of the AC cycle",
        "It doesn't require a transformer"
      ],
      correctAnswer: 2,
      explanation: "The main advantage of a full wave rectifier is that it utilizes both halves (positive and negative) of the AC input cycle, converting them both to the same polarity at the output. This results in more efficient power conversion and less ripple in the output."
    },
    {
      id: 2,
      question: "How many diodes are used in a bridge type full wave rectifier?",
      options: [
        "One",
        "Two",
        "Four",
        "Six"
      ],
      correctAnswer: 2,
      explanation: "A bridge type full wave rectifier uses four diodes arranged in a bridge configuration. This arrangement allows current to flow through the load in the same direction during both halves of the AC cycle."
    },
    {
      id: 3,
      question: "What is the ripple frequency of a full wave rectifier with a 50Hz AC input?",
      options: [
        "25Hz",
        "50Hz",
        "100Hz",
        "200Hz"
      ],
      correctAnswer: 2,
      explanation: "The ripple frequency of a full wave rectifier is twice the input frequency. With a 50Hz AC input, the ripple frequency will be 100Hz because the rectifier produces an output pulse for each half-cycle of the input."
    },
    {
      id: 4,
      question: "What component is commonly used to reduce ripple in the output of a rectifier?",
      options: [
        "Resistor",
        "Inductor",
        "Capacitor",
        "Transformer"
      ],
      correctAnswer: 2,
      explanation: "A capacitor is commonly used to reduce ripple in the output of a rectifier. It acts as a filter by charging during the peaks of the rectified waveform and discharging slowly when the voltage drops, thus maintaining a more constant output voltage."
    },
    {
      id: 5,
      question: "What is the rectification efficiency of a full wave rectifier?",
      options: [
        "40.6%",
        "81.2%",
        "100%",
        "50%"
      ],
      correctAnswer: 1,
      explanation: "The rectification efficiency of a full wave rectifier is approximately 81.2%, which is twice that of a half-wave rectifier (40.6%). This higher efficiency is due to the full wave rectifier utilizing both halves of the AC input cycle."
    }
  ]

  return <ExperimentQuiz experimentId={6} title="Full Wave Rectifier" questions={questions} />
}