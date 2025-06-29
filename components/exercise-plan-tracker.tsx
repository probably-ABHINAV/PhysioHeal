
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Play, Pause, RotateCcw, CheckCircle, Clock, Target } from "lucide-react"

interface Exercise {
  id: number
  name: string
  description: string
  duration: number
  sets: number
  reps: string
  completed: boolean
  difficulty: "Easy" | "Medium" | "Hard"
  videoUrl?: string
}

const mockExercises: Exercise[] = [
  {
    id: 1,
    name: "Cat-Cow Stretch",
    description: "Gentle spinal mobilization to improve flexibility",
    duration: 60,
    sets: 3,
    reps: "10-15",
    completed: true,
    difficulty: "Easy"
  },
  {
    id: 2,
    name: "Knee to Chest",
    description: "Lower back stretch to reduce tension",
    duration: 45,
    sets: 2,
    reps: "Hold 30s each",
    completed: false,
    difficulty: "Easy"
  },
  {
    id: 3,
    name: "Bird Dog",
    description: "Core stability and back strengthening",
    duration: 90,
    sets: 3,
    reps: "10 each side",
    completed: false,
    difficulty: "Medium"
  }
]

export function ExercisePlanTracker() {
  const [exercises, setExercises] = useState<Exercise[]>(mockExercises)
  const [activeTimer, setActiveTimer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState<number>(0)

  const toggleExerciseComplete = (id: number) => {
    setExercises(prev =>
      prev.map(exercise =>
        exercise.id === id
          ? { ...exercise, completed: !exercise.completed }
          : exercise
      )
    )
  }

  const startTimer = (exerciseId: number, duration: number) => {
    setActiveTimer(exerciseId)
    setTimeLeft(duration)
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setActiveTimer(null)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const completedCount = exercises.filter(ex => ex.completed).length
  const progressPercentage = (completedCount / exercises.length) * 100

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Hard": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Today's Exercise Plan
            </span>
            <Badge variant="outline">
              {completedCount}/{exercises.length} completed
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{exercises.length}</div>
                <div className="text-sm text-muted-foreground">Total Exercises</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {exercises.reduce((total, ex) => total + ex.duration, 0)}s
                </div>
                <div className="text-sm text-muted-foreground">Total Time</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise List */}
      <div className="space-y-4">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className={`transition-all duration-200 ${
            exercise.completed ? 'bg-green-50 border-green-200' : 'hover:shadow-md'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Checkbox
                  checked={exercise.completed}
                  onCheckedChange={() => toggleExerciseComplete(exercise.id)}
                  className="mt-1"
                />
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-semibold ${
                      exercise.completed ? 'line-through text-muted-foreground' : ''
                    }`}>
                      {exercise.name}
                    </h3>
                    <Badge className={getDifficultyColor(exercise.difficulty)}>
                      {exercise.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground">{exercise.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {exercise.duration}s
                    </span>
                    <span>{exercise.sets} sets</span>
                    <span>{exercise.reps} reps</span>
                  </div>
                  
                  {/* Timer and Controls */}
                  <div className="flex items-center space-x-3">
                    {activeTimer === exercise.id ? (
                      <div className="flex items-center space-x-2">
                        <div className="text-lg font-mono font-bold text-blue-600">
                          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setActiveTimer(null)}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startTimer(exercise.id, exercise.duration)}
                        disabled={exercise.completed}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Start Timer
                      </Button>
                    )}
                    
                    {exercise.completed && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button 
          className="flex-1"
          disabled={completedCount === 0}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Progress
        </Button>
        <Button 
          variant="outline"
          className="flex-1"
        >
          Save Progress
        </Button>
      </div>
    </div>
  )
}
