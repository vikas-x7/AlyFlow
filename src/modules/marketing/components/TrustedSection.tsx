'use client';

import { GitPullRequest, Pencil, Box, Users } from 'lucide-react';

const stats = [
  { label: 'Flows created', value: '84K' },
  { label: 'Nodes connected', value: '2.1M' },
  { label: 'Hours saved', value: '40K' },
  { label: 'Canvas size limit', value: '∞' },
];

const features = [
  {
    icon: <Box size={18} />,
    title: 'Infinite canvas',
    desc: 'Build flows without boundaries. Alyflow gives you an unlimited canvas so your ideas never feel cramped zoom, pan, and place nodes anywhere.',
  },
  {
    icon: <Pencil size={18} />,
    title: 'Drag, drop and connect',
    desc: 'Creating a flow is as simple as dragging a node and drawing an edge. No technical setup needed just think visually and build.',
  },
  {
    icon: <GitPullRequest size={18} />,
    title: 'Smart edge routing',
    desc: 'Edges automatically find the cleanest path between nodes. Keep your diagrams readable even as they grow complex.',
  },
  {
    icon: <Users size={18} />,
    title: 'Canvas share',
    desc: 'Share your canvas with teammates, gather feedback, and iterate together. Alyflow is designed for collaboration from the ground up.',
  },
];

export default function TrustedSection() {
  return (
    <section id="about" className="w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 font-gothic">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[10px] p-3 sm:p-4 flex flex-col justify-between min-h-36 sm:min-h-44 md:min-h-55" style={{ backgroundColor: '#F2F2F2' }}>
              <span className="text-[13px] sm:text-[15px] md:text-[17px] text-black font-medium tracking-wide">{stat.label}</span>
              <span className="text-4xl sm:text-5xl md:text-6xl font-light text-black/80 mt-4 sm:mt-6">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-20 sm:mt-32 md:mt-60">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-medium text-black mb-8 sm:mb-12 font-instrument -tracking-[1px] sm:-tracking-[2px]">Why you should choose Alyflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-8 sm:gap-y-10 mt-10 sm:mt-16 md:mt-25">
            {features.map((f) => (
              <div key={f.title}>
                <div className="flex items-center gap-2 text-black font-semibold text-[14px] sm:text-[15px] mb-2 sm:mb-3 font-instrument">
                  {f.icon}
                  {f.title}
                </div>
                <p className="text-[14px] sm:text-[16px] font-semibold text-black/70 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
