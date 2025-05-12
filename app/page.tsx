"use client";

import { useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import {
    Home,
    BookOpen,
    Settings,
    LogIn,
    FileQuestion,
    Users,
    Info,
} from "lucide-react";
import { DigitalClock } from "@/components/digital-clock";
import { GlowingCard } from "@/components/glowing-card";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { motion } from "framer-motion";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Button } from "@/components/ui/moving-border";
import Link from "next/link";
import { DynamicSidebar } from "@/components/dynamic-sidebar";
import Image from "next/image";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

// Updated experiments with all Tinkercad embed IDs
const experiments = [
    {
        id: 1,
        title: "Kirchhoff's Voltage Law",
        description:
            "Understand the relationship between voltages in a closed loop circuit",
        embedId: "hNWAhAfShmV", // Tinkercad embed ID
    },
    {
        id: 2,
        title: "Thevenin's Theorem",
        description: "Learn about equivalent circuit simplification techniques",
        embedId: "lAusQJ3m4bF", // Tinkercad embed ID
    },
    {
        id: 3,
        title: "House Wiring",
        description: "Explore residential electrical wiring systems and safety",
        embedId: "2rTQ63Z8SdD", // Tinkercad embed ID
    },
    {
        id: 4,
        title: "Fluorescent Lamp Wiring",
        description:
            "Study the wiring and operation of fluorescent lighting systems",
        embedId: "hnFoQc772H0", // Tinkercad embed ID
    },
    {
        id: 5,
        title: "Staircase Wiring",
        description:
            "Understand multi-way switching for staircase lighting control",
        embedId: "94YWeHFB9oN", // Tinkercad embed ID
    },
    {
        id: 6,
        title: "Full Wave Rectifier",
        description:
            "Learn about AC to DC conversion using full wave rectification",
        embedId: "jbRQbeSnAzj", // Tinkercad embed ID
    },
];

export default function HomePage() {
    const experimentsRef = useRef(null);
    const geminiRef = useRef(null);
    const [open, setOpen] = useState(false);

    const { scrollYProgress } = useScroll({
        target: geminiRef,
        offset: ["start start", "end start"],
    });

    const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
    const pathLengthSecond = useTransform(
        scrollYProgress,
        [0, 0.8],
        [0.15, 1.2]
    );
    const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
    const pathLengthFourth = useTransform(
        scrollYProgress,
        [0, 0.8],
        [0.05, 1.2]
    );
    const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

    const scrollToExperiments = () => {
        experimentsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const dockItems = [
        {
            title: "Home",
            icon: <Home className="h-full w-full text-neutral-300" />,
            href: "/",
        },
        {
            title: "Experiments",
            icon: <BookOpen className="h-full w-full text-neutral-300" />,
            href: "/experiments",
        },
        {
            title: "Quizzes",
            icon: <FileQuestion className="h-full w-full text-neutral-300" />,
            href: "/quizzes",
        },
        {
            title: "Team",
            icon: <Users className="h-full w-full text-neutral-300" />,
            href: "/team",
        },
        {
            title: "About",
            icon: <Info className="h-full w-full text-neutral-300" />,
            href: "/about",
        },
        {
            title: "Settings",
            icon: <Settings className="h-full w-full text-neutral-300" />,
            href: "/settings",
        },
        {
            title: "Sign Up",
            icon: <LogIn className="h-full w-full text-neutral-300" />,
            href: "/signup",
        },
    ];

    const typewriterWords = [
        {
            text: "A",
        },
        {
            text: "virtual",
        },
        {
            text: "lab",
        },
        {
            text: "where",
        },
        {
            text: "innovation",
            className: "text-blue-400",
        },
        {
            text: "meets",
        },
        {
            text: "circuits",
            className: "text-blue-400",
        },
    ];

    return (
        <div className="flex flex-col bg-black text-white overflow-x-hidden">
            {/* Dynamic Sidebar */}
            <DynamicSidebar />

            {/* Hero Section with Gemini Effect */}
            <div
                ref={geminiRef}
                className="h-screen w-full bg-black relative pt-20 overflow-hidden"
            >
                <div className="absolute top-4 left-20 md:left-48 z-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center"
                    >
                        <div className="h-10 bg-white text-blue-800 font-bold px-3 py-1 rounded">
                            SRM EEE
                        </div>
                    </motion.div>
                </div>

                {/* Centered navigation at the top */}
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                    <FloatingDock
                        items={dockItems}
                        className="w-auto"
                        mobileClassName="w-auto"
                    />
                </div>

                <DigitalClock />

                <div className="mt-32 mb-4 max-w-4xl mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl md:text-6xl font-bold text-center text-white leading-tight"
                    >
                        Electrical & Electronics Engineering
                    </motion.h1>

                    <div className="flex justify-center mt-2">
                        <TypewriterEffectSmooth words={typewriterWords} />
                    </div>
                </div>

                <div className="w-full flex justify-center mt-8 z-20 relative">
                    <Button
                        as={Link}
                        href="#experiments"
                        onClick={scrollToExperiments}
                        className="bg-black border-blue-500 text-white"
                        containerClassName="w-auto"
                    >
                        Explore Experiments
                    </Button>
                </div>

                {/* Position the Google Gemini Effect below the button with better positioning */}
                <div className="absolute inset-x-0 top-[35%] z-10 overflow-visible">
                    <GoogleGeminiEffect
                        pathLengths={[
                            pathLengthFirst,
                            pathLengthSecond,
                            pathLengthThird,
                            pathLengthFourth,
                            pathLengthFifth,
                        ]}
                        title=""
                        description=""
                        className="w-full"
                    />
                </div>
            </div>

            {/* Experiments Section */}
            <div
                ref={experimentsRef}
                id="experiments"
                className="w-full py-16 md:py-24 bg-black mt-20"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-blue-900/30 px-3 py-1 text-sm text-blue-300">
                                Interactive Learning
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                                Hands-on Electrical Engineering Experiments
                            </h2>
                            <p className="max-w-[900px] text-neutral-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Our platform offers interactive experiments to
                                help you understand complex electrical and
                                electronic concepts in an engaging way.
                            </p>
                        </div>
                    </div>

                    {/* Updated grid to show 2 cards per row with wider cards */}
                    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-6xl mx-auto">
                        {experiments.map((experiment) => (
                            <GlowingCard
                                key={experiment.id}
                                href={`/experiments/${experiment.id}`}
                                experimentId={experiment.id}
                                title={experiment.title}
                                description={experiment.description}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
