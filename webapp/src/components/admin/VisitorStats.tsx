import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Globe2, Users } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { api } from "@/lib/api";

interface AnalyticsData {
    totalVisits: number;
    visitsByCountry: Array<{ countryCode: string; count: number }>;
    hourlyVisits: Array<{ hour: string; count: number }>;
}

export function VisitorStats() {
    const { data, isLoading } = useQuery<AnalyticsData>({
        queryKey: ["analytics-stats"],
        queryFn: async () => {
            return await api.get<AnalyticsData>("/api/analytics/stats");
        },
        refetchInterval: 30000, // Refetch every 30 seconds
    });

    if (isLoading || !data) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse border-border/50 bg-card/60">
                        <CardHeader className="h-[28px]" />
                        <CardContent className="h-[60px]" />
                    </Card>
                ))}
            </div>
        );
    }

    // Format data for chart
    const chartData = data.hourlyVisits.map(item => {
        const date = new Date(item.hour);
        return {
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            visits: item.count
        };
    });

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="col-span-1 lg:col-span-1 border-border/50 bg-card hover:bg-card/80 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                    <Activity className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold tracking-tight">{data.totalVisits}</div>
                    <p className="text-xs text-muted-foreground mt-1">Lifetime total</p>
                </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2 lg:col-span-2 border-border/50 bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Views (Last 72 Hours)</CardTitle>
                    <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent className="h-[140px] pt-4">
                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <XAxis
                                    dataKey="time"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: '#71717a' }}
                                />
                                <YAxis
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: '#71717a' }}
                                    width={30}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                    contentStyle={{ background: '#09090b', border: '1px solid #27272a', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}
                                    labelStyle={{ color: '#a1a1aa', fontSize: '12px', marginBottom: '4px' }}
                                />
                                <Bar dataKey="visits" fill="#d4af37" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground bg-muted/20 rounded-md">
                            No recent visits to display.
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="col-span-1 lg:col-span-1 border-border/50 bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Top Countries</CardTitle>
                    <Globe2 className="h-4 w-4 text-indigo-500" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 mt-2">
                        {data.visitsByCountry.length > 0 ? (
                            data.visitsByCountry.slice(0, 4).map((item, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></div>
                                        <span className="font-medium text-sm text-foreground/90">
                                            {item.countryCode || 'Local/Unknown'}
                                        </span>
                                    </div>
                                    <span className="text-sm text-muted-foreground font-medium bg-muted/50 px-2 py-0.5 rounded-full">{item.count}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-muted-foreground text-center py-4 bg-muted/20 rounded-md">No country data</div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
