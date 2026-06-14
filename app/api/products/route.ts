import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET() {
  try {

    const produits = await prisma.product.findMany();

    return NextResponse.json(produits);

  } catch (error) {

    console.log("GET ERROR:", error);

    return NextResponse.json(
      {error: "Erreur GET"},
      {status:500}
    );

  }
}



export async function POST(req:Request) {

  try {

    const body = await req.json();

    console.log("DATA RECUE:", body);


    const produit = await prisma.product.create({

      data:{
        ref: body.ref,
        nom: body.nom,
        qte: Number(body.qte),
        prix: Number(body.prix),
        lot: body.lot || "N/A",
        client: body.client,
        statut: body.statut
      }

    });


    return NextResponse.json(produit);


  } catch(error) {

    console.log("POST ERROR:", error);


    return NextResponse.json(
      {error:"Erreur POST"},
      {status:500}
    );

  }

}