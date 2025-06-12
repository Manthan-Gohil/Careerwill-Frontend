"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, TrendingDown, Award, Target, Clock, Brain, Calendar, CheckCircle, Play, ChevronDown } from "lucide-react"

const StudentProgressDashboard = ({ studentData, students, selectedStudentId, onStudentChange }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")

  const StatCard = ({ title, value, change, icon: Icon, color, subtitle }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {change && (
        <div className="mt-4 flex items-center">
          {change.startsWith("+") ? (
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
            {change}
          </span>
          <span className="text-gray-500 text-sm ml-1">vs last month</span>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Student Dropdown */}
              <div className="relative">
                <select
                  value={selectedStudentId}
                  onChange={e => onStudentChange(Number(e.target.value))}
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none bg-white text-lg font-semibold text-gray-900"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} - Score: {s.overallScore}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              {/* Small Button */}
              <button
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors font-medium"
              >
                Share
              </button>
              {/* Timeframe Dropdown */}
              <div className="relative">
                <select
                  value={selectedTimeframe}
                  onChange={e => setSelectedTimeframe(e.target.value)}
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none bg-white text-base"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <p className="text-gray-600 w-full sm:w-auto mt-2 sm:mt-0">Track your academic journey and stay motivated!</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Overall Score"
            value={studentData.overallScore}
            change={studentData.scoreChange}
            icon={Award}
            color="bg-blue-500"
            subtitle="Above average"
          />
          <StatCard
            title="Study Hours"
            value={studentData.studyHours}
            change={studentData.hoursChange}
            icon={Clock}
            color="bg-green-500"
            subtitle="This week"
          />
          <StatCard
            title="Tests Completed"
            value={studentData.testsCompleted}
            change={studentData.testsChange}
            icon={CheckCircle}
            color="bg-purple-500"
            subtitle="This month"
          />
          <StatCard
            title="Current Rank"
            value={studentData.currentRank}
            change={studentData.rankChange}
            icon={Target}
            color="bg-orange-500"
            subtitle={`Out of ${studentData.totalStudents.toLocaleString()}`}
          />
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Trend */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Performance Trend</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Score</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Target</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={studentData.performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#EF4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Subject Performance */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Subject Performance</h3>
            <div className="space-y-4">
              {studentData.subjectData.map((subject, index) => (
                <div key={subject.subject} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: subject.color }}></div>
                    <span className="font-medium text-gray-700">{subject.subject}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${subject.score}%`,
                          backgroundColor: subject.color,
                        }}
                      ></div>
                    </div>
                    <span className="font-bold text-gray-900 w-12">{subject.score}%</span>
                    <span className="text-green-600 text-sm font-medium w-12">{subject.improvement}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Study Hours */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Study Hours</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={studentData.studyHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Areas to Improve */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Areas to Improve</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={studentData.weakAreasData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {studentData.weakAreasData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {studentData.weakAreasData.map((area, index) => (
                <div key={area.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: area.color }}></div>
                    <span className="text-gray-700">{area.name}</span>
                  </div>
                  <span className="font-medium">{area.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Goal Progress */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Goal Progress</h3>
            <div className="space-y-6">
              {studentData.goalProgress.map((goal, index) => (
                <div key={goal.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{goal.name}</span>
                    <span className="text-sm text-gray-500">
                      {goal.current}/{goal.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${(goal.current / goal.target) * 100}%`,
                        backgroundColor: goal.color,
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round((goal.current / goal.target) * 100)}% Complete
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Test Analysis */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Test Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={studentData.testAnalysisData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Area type="monotone" dataKey="correct" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
              <Area type="monotone" dataKey="incorrect" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.8} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold mb-2">Take Practice Test</h4>
                <p className="text-blue-100">Improve your weak areas</p>
              </div>
              <Play className="w-8 h-8" />
            </div>
            <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Start Now
            </button>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold mb-2">Study Schedule</h4>
                <p className="text-green-100">Plan your next session</p>
              </div>
              <Calendar className="w-8 h-8" />
            </div>
            <button className="mt-4 bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
              View Schedule
            </button>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold mb-2">Get Help</h4>
                <p className="text-purple-100">Ask doubts to mentors</p>
              </div>
              <Brain className="w-8 h-8" />
            </div>
            <button className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
              Ask Question
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProgressDashboard