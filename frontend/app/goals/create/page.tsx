"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  ArrowLeft, 
  ArrowRight, 
  Check,
  Plus,
  X,
  Calendar,
  Users,
  Star,
  BookOpen,
  Clock,
  MapPin,
  Briefcase,
  Save,
  Flag,
  TrendingUp,
  Award
} from "lucide-react";
import { toast } from "sonner";

const steps = [
  {
    id: 1,
    title: "Goal Basics",
    description: "Goal title, category, and description",
    icon: Target
  },
  {
    id: 2,
    title: "Timeline & Milestones",
    description: "Target dates and key milestones",
    icon: Calendar
  },
  {
    id: 3,
    title: "Success Metrics",
    description: "How to measure progress and success",
    icon: TrendingUp
  },
  {
    id: 4,
    title: "Review & Create",
    description: "Review and finalize goal",
    icon: Check
  }
];

export default function CreateGoalPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [goalData, setGoalData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    targetDate: "",
    startDate: "",
    milestones: [] as Array<{
      title: string;
      description: string;
      dueDate: string;
      completed: boolean;
    }>,
    successMetrics: [] as string[],
    sharedWith: [] as string[],
    isPublic: false,
    hasDeadline: true,
    estimatedHours: "",
    notes: "",
    tags: [] as string[]
  });

  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    dueDate: ""
  });
  const [newMetric, setNewMetric] = useState("");
  const [newTag, setNewTag] = useState("");

  const addMilestone = () => {
    if (newMilestone.title.trim() && newMilestone.dueDate) {
      setGoalData(prev => ({
        ...prev,
        milestones: [...prev.milestones, { ...newMilestone, completed: false }]
      }));
      setNewMilestone({
        title: "",
        description: "",
        dueDate: ""
      });
    }
  };

  const removeMilestone = (index: number) => {
    setGoalData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const addMetric = () => {
    if (newMetric.trim() && !goalData.successMetrics.includes(newMetric.trim())) {
      setGoalData(prev => ({
        ...prev,
        successMetrics: [...prev.successMetrics, newMetric.trim()]
      }));
      setNewMetric("");
    }
  };

  const removeMetric = (metricToRemove: string) => {
    setGoalData(prev => ({
      ...prev,
      successMetrics: prev.successMetrics.filter(metric => metric !== metricToRemove)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !goalData.tags.includes(newTag.trim())) {
      setGoalData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setGoalData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
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

  const handleCreateGoal = () => {
    // Simulate API call
    toast.success("Goal created successfully!");
    // In real app, navigate to goals list
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your goal title"
                  value={goalData.title}
                  onChange={(e) => setGoalData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={goalData.category} onValueChange={(value) => setGoalData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professional Growth">Professional Growth</SelectItem>
                    <SelectItem value="Skills Development">Skills Development</SelectItem>
                    <SelectItem value="Career Change">Career Change</SelectItem>
                    <SelectItem value="Personal Development">Personal Development</SelectItem>
                    <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                    <SelectItem value="Financial">Financial</SelectItem>
                    <SelectItem value="Learning">Learning</SelectItem>
                    <SelectItem value="Networking">Networking</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select value={goalData.priority} onValueChange={(value) => setGoalData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your goal in detail. What do you want to achieve and why?"
                  value={goalData.description}
                  onChange={(e) => setGoalData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {goalData.tags.map((tag, index) => (
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
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={goalData.startDate}
                  onChange={(e) => setGoalData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Completion Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={goalData.targetDate}
                  onChange={(e) => setGoalData(prev => ({ ...prev, targetDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedHours">Estimated Hours Required</Label>
              <Input
                id="estimatedHours"
                type="number"
                placeholder="e.g., 40"
                value={goalData.estimatedHours}
                onChange={(e) => setGoalData(prev => ({ ...prev, estimatedHours: e.target.value }))}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasDeadline"
                  checked={goalData.hasDeadline}
                  onCheckedChange={(checked) => setGoalData(prev => ({ ...prev, hasDeadline: checked as boolean }))}
                />
                <Label htmlFor="hasDeadline">This goal has a deadline</Label>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Milestones</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="milestoneTitle">Milestone Title</Label>
                    <Input
                      id="milestoneTitle"
                      placeholder="e.g., Complete course"
                      value={newMilestone.title}
                      onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="milestoneDescription">Description</Label>
                    <Input
                      id="milestoneDescription"
                      placeholder="Brief description"
                      value={newMilestone.description}
                      onChange={(e) => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="milestoneDueDate">Due Date</Label>
                    <Input
                      id="milestoneDueDate"
                      type="date"
                      value={newMilestone.dueDate}
                      onChange={(e) => setNewMilestone(prev => ({ ...prev, dueDate: e.target.value }))}
                    />
                  </div>
                </div>

                <Button onClick={addMilestone} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Milestone
                </Button>
              </div>

              <div className="space-y-2">
                {goalData.milestones.length === 0 ? (
                  <p className="text-muted-foreground">No milestones added yet</p>
                ) : (
                  <div className="space-y-2">
                    {goalData.milestones.map((milestone, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{milestone.title}</h4>
                              <p className="text-sm text-muted-foreground">{milestone.description}</p>
                              <p className="text-xs text-muted-foreground">Due: {milestone.dueDate}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeMilestone(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Success Metrics</Label>
                <p className="text-sm text-muted-foreground">
                  Define how you'll measure progress and success for this goal
                </p>
                <div className="space-y-2 mb-2">
                  {goalData.successMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="flex-1">{metric}</span>
                      <button
                        onClick={() => removeMetric(metric)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="e.g., Complete 3 online courses"
                    value={newMetric}
                    onChange={(e) => setNewMetric(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addMetric()}
                  />
                  <Button onClick={addMetric} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes, resources, or context for this goal"
                  value={goalData.notes}
                  onChange={(e) => setGoalData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPublic"
                    checked={goalData.isPublic}
                    onCheckedChange={(checked) => setGoalData(prev => ({ ...prev, isPublic: checked as boolean }))}
                  />
                  <Label htmlFor="isPublic">Make this goal public to the community</Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Goal Summary</CardTitle>
                <CardDescription>Review your goal details before creating</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Goal Title</Label>
                      <p className="text-lg font-medium">{goalData.title}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Category</Label>
                      <Badge variant="outline">{goalData.category}</Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Priority</Label>
                      <Badge variant={goalData.priority === 'high' || goalData.priority === 'urgent' ? 'destructive' : 'secondary'}>
                        {goalData.priority}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Timeline</Label>
                      <p className="text-sm text-muted-foreground">
                        {goalData.startDate} to {goalData.targetDate}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Estimated Hours</Label>
                      <p className="text-sm text-muted-foreground">{goalData.estimatedHours} hours</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Milestones</Label>
                      <p className="text-sm text-muted-foreground">{goalData.milestones.length} milestones</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Success Metrics</Label>
                      <p className="text-sm text-muted-foreground">{goalData.successMetrics.length} metrics</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Visibility</Label>
                      <Badge variant={goalData.isPublic ? 'default' : 'secondary'}>
                        {goalData.isPublic ? 'Public' : 'Private'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{goalData.description}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Tags</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {goalData.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Milestones</Label>
                  <div className="space-y-2 mt-1">
                    {goalData.milestones.map((milestone, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{milestone.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            Due: {milestone.dueDate}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Success Metrics</Label>
                  <div className="space-y-1 mt-1">
                    {goalData.successMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {goalData.notes && (
                  <div>
                    <Label className="text-sm font-medium">Notes</Label>
                    <p className="text-sm text-muted-foreground mt-1">{goalData.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Create Goal</h1>
                  <p className="text-sm text-muted-foreground">Set up a new personal or professional goal</p>
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
                          isActive ? 'bg-green-600 text-white' :
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
                            isActive ? 'text-green-600' : 'text-gray-500'
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
                  <Button onClick={handleCreateGoal}>
                    <Save className="w-4 h-4 mr-2" />
                    Create Goal
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
    </MainLayout>
  );
}
