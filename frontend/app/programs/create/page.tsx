"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  GraduationCap, 
  ArrowLeft, 
  ArrowRight, 
  Check,
  Plus,
  X,
  Calendar,
  Users,
  Target,
  BookOpen,
  Clock,
  MapPin,
  Briefcase,
  Star,
  Save
} from "lucide-react";
import { toast } from "sonner";

const steps = [
  {
    id: 1,
    title: "Basic Information",
    description: "Program name, type, and description",
    icon: GraduationCap
  },
  {
    id: 2,
    title: "Program Details",
    description: "Duration, capacity, and requirements",
    icon: Clock
  },
  {
    id: 3,
    title: "Phases & Timeline",
    description: "Program phases and milestones",
    icon: Calendar
  },
  {
    id: 4,
    title: "Review & Create",
    description: "Review and finalize program",
    icon: Check
  }
];

export default function CreateProgramPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [programData, setProgramData] = useState({
    name: "",
    type: "",
    description: "",
    department: "",
    duration: "",
    maxParticipants: "",
    startDate: "",
    endDate: "",
    tags: [] as string[],
    requirements: [] as string[],
    phases: [] as Array<{
      name: string;
      description: string;
      startDate: string;
      endDate: string;
      objectives: string[];
    }>,
    coordinator: "",
    location: "",
    isVirtual: false,
    hasCertification: false
  });

  const [newTag, setNewTag] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [newPhase, setNewPhase] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    objectives: [] as string[]
  });
  const [newObjective, setNewObjective] = useState("");

  const addTag = () => {
    if (newTag.trim() && !programData.tags.includes(newTag.trim())) {
      setProgramData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setProgramData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim() && !programData.requirements.includes(newRequirement.trim())) {
      setProgramData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement("");
    }
  };

  const removeRequirement = (reqToRemove: string) => {
    setProgramData(prev => ({
      ...prev,
      requirements: prev.requirements.filter(req => req !== reqToRemove)
    }));
  };

  const addPhase = () => {
    if (newPhase.name.trim() && newPhase.startDate && newPhase.endDate) {
      setProgramData(prev => ({
        ...prev,
        phases: [...prev.phases, { ...newPhase }]
      }));
      setNewPhase({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        objectives: []
      });
    }
  };

  const removePhase = (index: number) => {
    setProgramData(prev => ({
      ...prev,
      phases: prev.phases.filter((_, i) => i !== index)
    }));
  };

  const addObjective = () => {
    if (newObjective.trim() && !newPhase.objectives.includes(newObjective.trim())) {
      setNewPhase(prev => ({
        ...prev,
        objectives: [...prev.objectives, newObjective.trim()]
      }));
      setNewObjective("");
    }
  };

  const removeObjective = (objectiveToRemove: string) => {
    setNewPhase(prev => ({
      ...prev,
      objectives: prev.objectives.filter(obj => obj !== objectiveToRemove)
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateProgram = () => {
    // Simulate API call
    toast.success("Program created successfully!");
    // In real app, navigate to programs list
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Program Name</Label>
                <Input
                  id="name"
                  placeholder="Enter program name"
                  value={programData.name}
                  onChange={(e) => setProgramData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Program Type</Label>
                <Select value={programData.type} onValueChange={(value) => setProgramData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select program type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mentorship">Mentorship</SelectItem>
                    <SelectItem value="coaching">Coaching</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the program objectives and benefits"
                  value={programData.description}
                  onChange={(e) => setProgramData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={programData.department} onValueChange={(value) => setProgramData(prev => ({ ...prev, department: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Business Administration">Business Administration</SelectItem>
                    <SelectItem value="All Departments">All Departments</SelectItem>
                    <SelectItem value="Information Technology">Information Technology</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Executive Office">Executive Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {programData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 6 months"
                  value={programData.duration}
                  onChange={(e) => setProgramData(prev => ({ ...prev, duration: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Maximum Participants</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  placeholder="30"
                  value={programData.maxParticipants}
                  onChange={(e) => setProgramData(prev => ({ ...prev, maxParticipants: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={programData.startDate}
                  onChange={(e) => setProgramData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={programData.endDate}
                  onChange={(e) => setProgramData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Requirements</Label>
              <div className="space-y-2 mb-2">
                {programData.requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="flex-1">{req}</span>
                    <button
                      onClick={() => removeRequirement(req)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a requirement"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                />
                <Button onClick={addRequirement} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isVirtual"
                  checked={programData.isVirtual}
                  onCheckedChange={(checked) => setProgramData(prev => ({ ...prev, isVirtual: checked as boolean }))}
                />
                <Label htmlFor="isVirtual">Virtual/Online Program</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasCertification"
                  checked={programData.hasCertification}
                  onCheckedChange={(checked) => setProgramData(prev => ({ ...prev, hasCertification: checked as boolean }))}
                />
                <Label htmlFor="hasCertification">Includes Certification</Label>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phaseName">Phase Name</Label>
                  <Input
                    id="phaseName"
                    placeholder="e.g., Orientation"
                    value={newPhase.name}
                    onChange={(e) => setNewPhase(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phaseDescription">Description</Label>
                  <Input
                    id="phaseDescription"
                    placeholder="Phase description"
                    value={newPhase.description}
                    onChange={(e) => setNewPhase(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phaseStartDate">Start Date</Label>
                  <Input
                    id="phaseStartDate"
                    type="date"
                    value={newPhase.startDate}
                    onChange={(e) => setNewPhase(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phaseEndDate">End Date</Label>
                  <Input
                    id="phaseEndDate"
                    type="date"
                    value={newPhase.endDate}
                    onChange={(e) => setNewPhase(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Phase Objectives</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newPhase.objectives.map((objective, index) => (
                    <Badge key={index} variant="outline" className="flex items-center space-x-1">
                      <span>{objective}</span>
                      <button
                        onClick={() => removeObjective(objective)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add an objective"
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addObjective()}
                  />
                  <Button onClick={addObjective} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button onClick={addPhase} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Phase
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Program Phases</h3>
              {programData.phases.length === 0 ? (
                <p className="text-muted-foreground">No phases added yet</p>
              ) : (
                <div className="space-y-4">
                  {programData.phases.map((phase, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{phase.name}</CardTitle>
                            <CardDescription>{phase.description}</CardDescription>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removePhase(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label className="text-sm font-medium">Start Date</Label>
                            <p className="text-sm text-muted-foreground">{phase.startDate}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">End Date</Label>
                            <p className="text-sm text-muted-foreground">{phase.endDate}</p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Objectives</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {phase.objectives.map((objective, objIndex) => (
                              <Badge key={objIndex} variant="secondary" className="text-xs">
                                {objective}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Summary</CardTitle>
                <CardDescription>Review your program details before creating</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Program Name</Label>
                      <p className="text-lg font-medium">{programData.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Type</Label>
                      <Badge variant="outline">{programData.type}</Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Department</Label>
                      <p className="text-sm text-muted-foreground">{programData.department}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Duration</Label>
                      <p className="text-sm text-muted-foreground">{programData.duration}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Start Date</Label>
                      <p className="text-sm text-muted-foreground">{programData.startDate}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">End Date</Label>
                      <p className="text-sm text-muted-foreground">{programData.endDate}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Max Participants</Label>
                      <p className="text-sm text-muted-foreground">{programData.maxParticipants}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Program Features</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {programData.isVirtual && <Badge variant="secondary">Virtual</Badge>}
                        {programData.hasCertification && <Badge variant="secondary">Certification</Badge>}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{programData.description}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Tags</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {programData.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Requirements</Label>
                  <div className="space-y-1 mt-1">
                    {programData.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Program Phases</Label>
                  <div className="space-y-2 mt-1">
                    {programData.phases.map((phase, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{phase.name}</h4>
                          <span className="text-xs text-muted-foreground">
                            {phase.startDate} - {phase.endDate}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {phase.objectives.map((objective, objIndex) => (
                            <Badge key={objIndex} variant="secondary" className="text-xs">
                              {objective}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Create Program</h1>
                <p className="text-sm text-muted-foreground">Set up a new mentorship or coaching program</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500 text-white' :
                        isActive ? 'bg-blue-500 text-white' :
                        'bg-gray-200 text-gray-500'
                      }`}>
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <IconComponent className="w-5 h-5" />
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <p className={`text-sm font-medium ${
                          isActive ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-muted-foreground hidden md:block">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {currentStep === steps.length ? (
                <Button onClick={handleCreateProgram}>
                  <Save className="w-4 h-4 mr-2" />
                  Create Program
                </Button>
              ) : (
                <Button onClick={nextStep}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
