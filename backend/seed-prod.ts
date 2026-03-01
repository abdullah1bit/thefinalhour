import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// Connect directly to the production Neon Database
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://neondb_owner:npg_EUq7fpoLnbG3@ep-lingering-credit-a1aacwj9-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
        }
    }
});

const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: "sqlite" }),
    emailAndPassword: { enabled: true },
});

async function seedProductionAdmin() {
    console.log("Connecting to production Neon DB...");

    try {
        // Check if admin exists first
        const existingAdmin = await prisma.user.findUnique({
            where: { email: "admin@thefinalhour.com" }
        });

        if (existingAdmin) {
            console.log("Admin user already exists in production database.", existingAdmin);
            return;
        }

        console.log("Creating admin user in production...");
        await auth.api.signUpEmail({
            body: {
                email: "admin@thefinalhour.com",
                password: "admin123",
                name: "Admin"
            },
        });

        await prisma.user.update({
            where: { email: "admin@thefinalhour.com" },
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
