'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Clock,
  Mail,
  User,
  Calendar,
  Sparkles,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react'
import { updateSuggestionStatus } from '@/lib/admin-actions'
import type { Suggestion } from '@/lib/supabase/client'

interface AdminDashboardProps {
  suggestions: Suggestion[]
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  reviewed: 'bg-blue-100 text-blue-800 border-blue-300',
  implemented: 'bg-green-100 text-green-800 border-green-300',
  rejected: 'bg-red-100 text-red-800 border-red-300'
}

const statusIcons = {
  pending: Clock,
  reviewed: Eye,
  implemented: CheckCircle,
  rejected: XCircle
}

export function AdminDashboard({ suggestions }: AdminDashboardProps) {
  const [filter, setFilter] = useState<string>('all')
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  const filteredSuggestions = suggestions.filter((suggestion) => {
    if (filter === 'all') return true
    return suggestion.status === filter
  })

  const statusCounts = {
    all: suggestions.length,
    pending: suggestions.filter((s) => s.status === 'pending').length,
    reviewed: suggestions.filter((s) => s.status === 'reviewed').length,
    implemented: suggestions.filter((s) => s.status === 'implemented').length,
    rejected: suggestions.filter((s) => s.status === 'rejected').length
  }

  const handleStatusUpdate = async (
    suggestionId: string,
    newStatus: string
  ) => {
    setUpdatingStatus(suggestionId)
    await updateSuggestionStatus(suggestionId, newStatus)
    setUpdatingStatus(null)
    // Refresh the page to show updated data
    window.location.reload()
  }

  return (
    <div className='space-y-8'>
      {/* Stats Overview */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4'>
        <Card className='bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <CardContent className='p-6'>
            <div className='flex items-center gap-3'>
              <Sparkles className='w-8 h-8 text-emerald-600' />
              <div>
                <p className='text-2xl font-bold text-slate-800'>
                  {statusCounts.all}
                </p>
                <p className='text-slate-600 text-sm'>Total Ideas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-white/80 backdrop-blur-sm border-yellow-200 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <CardContent className='p-6'>
            <div className='flex items-center gap-3'>
              <Clock className='w-8 h-8 text-yellow-600' />
              <div>
                <p className='text-2xl font-bold text-slate-800'>
                  {statusCounts.pending}
                </p>
                <p className='text-slate-600 text-sm'>Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <CardContent className='p-6'>
            <div className='flex items-center gap-3'>
              <Eye className='w-8 h-8 text-blue-600' />
              <div>
                <p className='text-2xl font-bold text-slate-800'>
                  {statusCounts.reviewed}
                </p>
                <p className='text-slate-600 text-sm'>Reviewed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <CardContent className='p-6'>
            <div className='flex items-center gap-3'>
              <CheckCircle className='w-8 h-8 text-green-600' />
              <div>
                <p className='text-2xl font-bold text-slate-800'>
                  {statusCounts.implemented}
                </p>
                <p className='text-slate-600 text-sm'>Implemented</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-white/80 backdrop-blur-sm border-red-200 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <CardContent className='p-6'>
            <div className='flex items-center gap-3'>
              <XCircle className='w-8 h-8 text-red-600' />
              <div>
                <p className='text-2xl font-bold text-slate-800'>
                  {statusCounts.rejected}
                </p>
                <p className='text-slate-600 text-sm'>Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={setFilter} className='w-full'>
        <TabsList className='grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 bg-white/80 backdrop-blur-sm h-40 sm:h-10'>
          <TabsTrigger
            value='all'
            className='data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800 cursor-pointer'
          >
            All ({statusCounts.all})
          </TabsTrigger>
          <TabsTrigger
            value='pending'
            className='data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-800 cursor-pointer'
          >
            Pending ({statusCounts.pending})
          </TabsTrigger>
          <TabsTrigger
            value='reviewed'
            className='data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 cursor-pointer'
          >
            Reviewed ({statusCounts.reviewed})
          </TabsTrigger>
          <TabsTrigger
            value='implemented'
            className='data-[state=active]:bg-green-100 data-[state=active]:text-green-800 cursor-pointer'
          >
            Implemented ({statusCounts.implemented})
          </TabsTrigger>
          <TabsTrigger
            value='rejected'
            className='data-[state=active]:bg-red-100 data-[state=active]:text-red-800 cursor-pointer'
          >
            Rejected ({statusCounts.rejected})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className='mt-6'>
          <div className='grid gap-6'>
            {filteredSuggestions.length === 0 ? (
              <Card className='bg-white/80 backdrop-blur-sm border-emerald-200'>
                <CardContent className='p-12 text-center'>
                  <Sparkles className='w-16 h-16 text-emerald-300 mx-auto mb-4' />
                  <h3 className='text-xl font-semibold text-slate-700 mb-2'>
                    No suggestions yet
                  </h3>
                  <p className='text-slate-500'>
                    {filter === 'all'
                      ? 'No magical ideas have been submitted yet.'
                      : `No ${filter} suggestions found.`}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredSuggestions.map((suggestion) => {
                const StatusIcon = statusIcons[suggestion.status]
                return (
                  <Card
                    key={suggestion.id}
                    className='bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]'
                  >
                    <CardHeader>
                      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4'>
                        <div className='flex-1'>
                          <CardTitle className='font-serif text-xl text-slate-800 mb-2'>
                            {suggestion.title}
                          </CardTitle>
                          <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600'>
                            {!suggestion.author_name &&
                            !suggestion.author_email ? (
                              <div className='flex items-center gap-1'>
                                <User className='w-4 h-4' />
                                Anonymous
                              </div>
                            ) : (
                              <>
                                {suggestion.author_name && (
                                  <div className='flex items-center gap-1'>
                                    <User className='w-4 h-4' />
                                    {suggestion.author_name}
                                  </div>
                                )}
                                {suggestion.author_email && (
                                  <div className='flex items-center gap-1'>
                                    <Mail className='w-4 h-4' />
                                    {suggestion.author_email}
                                  </div>
                                )}
                              </>
                            )}
                            <div className='flex items-center gap-1'>
                              <Calendar className='w-4 h-4' />
                              {new Date(
                                suggestion.created_at
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className='flex items-center gap-3 mt-2 md:mt-0'>
                          <Badge
                            className={`${statusColors[suggestion.status]} flex items-center gap-1`}
                          >
                            <StatusIcon className='w-3 h-3' />
                            {suggestion.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className='text-slate-700 mb-4 leading-relaxed'>
                        {suggestion.description}
                      </p>
                      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2 md:mt-0'>
                        <span className='text-sm font-medium text-slate-600'>
                          Update Status:
                        </span>
                        <Select
                          value={suggestion.status}
                          onValueChange={(value) =>
                            handleStatusUpdate(suggestion.id, value)
                          }
                          disabled={updatingStatus === suggestion.id}
                        >
                          <SelectTrigger className='w-full md:w-40 border-emerald-200 focus:border-emerald-400'>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='pending'>Pending</SelectItem>
                            <SelectItem value='reviewed'>Reviewed</SelectItem>
                            <SelectItem value='implemented'>
                              Implemented
                            </SelectItem>
                            <SelectItem value='rejected'>Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        {updatingStatus === suggestion.id && (
                          <div className='text-sm text-emerald-600'>
                            Updating...
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
