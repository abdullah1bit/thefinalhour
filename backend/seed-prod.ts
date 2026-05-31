import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is required.`);
    }
    return value;
}

requireEnv("DATABASE_URL");
const adminEmail = requireEnv("ADMIN_EMAIL");
const adminPassword = requireEnv("ADMIN_PASSWORD");

const prisma = new PrismaClient();

const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: "postgresql" }),
    emailAndPassword: { enabled: true },
});

async function seedProductionAdmin() {
    console.log("Connecting to production database...");

    try {
        // Check if admin exists first
        const existingAdmin = await prisma.user.findUnique({
            where: { email: adminEmail }
        });

        if (existingAdmin) {
            console.log("Admin user already exists in production database.");
            return;
        }

        console.log("Creating admin user in production...");
        await auth.api.signUpEmail({
            body: {
                email: adminEmail,
                password: adminPassword,
                name: "Admin"
            },
        });

        await prisma.user.update({
            where: { email: adminEmail },
            data: { role: "admin" },
        });

        console.log("✅ Production Admin created successfully!");
    } catch (error) {
        console.error("Failed to seed production admin:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seedProductionAdmin();
