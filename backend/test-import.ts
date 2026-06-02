import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is required.`);
    }
    return value;
}

const databaseUrl = requireEnv("DATABASE_URL");
const backupJsonPath = process.argv[2] || process.env.BACKUP_JSON_PATH;

if (!backupJsonPath) {
    throw new Error("Provide a backup JSON path as the first argument or set BACKUP_JSON_PATH.");
}

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        }
    }
});

async function testImport() {
    console.log("Reading backup JSON...");
    const data = fs.readFileSync(backupJsonPath, "utf-8");
    const parsed = JSON.parse(data);
    const results: Record<string, number> = {};

    try {
        if (parsed.signs?.length) {
            await prisma.$transaction(async (tx) => {
                await tx.sign.deleteMany();
                for (const sign of parsed.signs) {
                    const { id, createdAt, updatedAt, ...data } = sign;
                    await tx.sign.create({ data: { ...data, sortOrder: data.sortOrder ?? 0 } });
                }
            }, { timeout: 15000 });
            results.signs = parsed.signs.length;
        }

        if (parsed.majorSigns?.length) {
            await prisma.$transaction(async (tx) => {
                await tx.majorSignDetail.deleteMany();
                await tx.majorSign.deleteMany();
                for (const ms of parsed.majorSigns) {
                    const { id, createdAt, updatedAt, details, ...data } = ms;
                    await tx.majorSign.create({
                        data: {
                            ...data,
                            sources: Array.isArray(data.sources) ? JSON.stringify(data.sources) : data.sources,
                            sortOrder: data.sortOrder ?? 0,
                            details: {
                                create: (details || []).map((d: any, i: number) => ({
                                    label: d.label,
                                    content: d.content,
                                    sortOrder: d.sortOrder ?? i,
                                })),
                            },
                        },
                    });
                }
            }, { timeout: 15000 });
            results.majorSigns = parsed.majorSigns.length;
        }

        if (parsed.glossary?.length) {
            await prisma.$transaction(async (tx) => {
                await tx.glossaryTerm.deleteMany();
                for (const term of parsed.glossary) {
                    const { id, createdAt, updatedAt, ...data } = term;
                    await tx.glossaryTerm.create({ data: { ...data, sortOrder: data.sortOrder ?? 0 } });
                }
            }, { timeout: 15000 });
            results.glossary = parsed.glossary.length;
        }

        if (parsed.verses?.length) {
            await prisma.$transaction(async (tx) => {
                await tx.quranicVerse.deleteMany();
                for (const verse of parsed.verses) {
                    const { id, createdAt, updatedAt, ...data } = verse;
                    await tx.quranicVerse.create({ data: { ...data, sortOrder: data.sortOrder ?? 0 } });
                }
            }, { timeout: 15000 });
            results.verses = parsed.verses.length;
        }

        if (parsed.scholarlyWorks?.length) {
            await prisma.$transaction(async (tx) => {
                await tx.scholarlyWork.deleteMany();
                for (const work of parsed.scholarlyWorks) {
                    const { id, createdAt, updatedAt, ...data } = work;
                    await tx.scholarlyWork.create({ data: { ...data, sortOrder: data.sortOrder ?? 0 } });
                }
            }, { timeout: 15000 });
            results.scholarlyWorks = parsed.scholarlyWorks.length;
        }

        if (parsed.timeline?.length) {
            await prisma.$transaction(async (tx) => {
                await tx.timelineEvent.deleteMany();
                for (const event of parsed.timeline) {
                    const { id, createdAt, updatedAt, ...data } = event;
                    await tx.timelineEvent.create({ data: { ...data, sortOrder: data.sortOrder ?? 0 } });
                }
            }, { timeout: 15000 });
            results.timeline = parsed.timeline.length;
        }

        if (parsed.interpretations?.length) {
            await prisma.$transaction(async (tx) => {
                await tx.interpretation.deleteMany();
                for (const interp of parsed.interpretations) {
                    const { id, createdAt, updatedAt, ...data } = interp;
                    await tx.interpretation.create({ data: { ...data, sortOrder: data.sortOrder ?? 0 } });
                }
            }, { timeout: 15000 });
            results.interpretations = parsed.interpretations.length;
        }

        if (parsed.banners?.length) {
            await prisma.$transaction(async (tx) => {
                await tx.announcementBanner.deleteMany();
                for (const banner of parsed.banners) {
                    const { id, createdAt, updatedAt, ...data } = banner;
                    await tx.announcementBanner.create({ data: { ...data, sortOrder: data.sortOrder ?? 0 } });
                }
            }, { timeout: 15000 });
            results.banners = parsed.banners.length;
        }

        if (parsed.settings && Object.keys(parsed.settings).length > 0) {
            await prisma.$transaction(async (tx) => {
                for (const [key, value] of Object.entries(parsed.settings)) {
                    await tx.siteSetting.upsert({
                        where: { key },
                        update: { value: value as string },
                        create: { key, value: value as string },
                    });
                }
            }, { timeout: 15000 });
            results.settings = Object.keys(parsed.settings).length;
        }

        console.log("Import successful!", results);
    } catch (err) {
        console.error("Import failed with error:");
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

testImport();
