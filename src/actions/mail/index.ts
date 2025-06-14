'use server'

import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import nodemailer from 'nodemailer'

export const onGetAllCustomers = async (id: string) => {
  try {
    const customers = await client.user.findUnique({
      where: {
        clerkId: id,
      },
      select: {
        subscription: {
          select: {
            credits: true,
            plan: true,
          },
        },
        domains: {
          select: {
            customer: {
              select: {
                id: true,
                email: true,
                Domain: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (customers) {
      return customers
    }
  } catch (error) {}
}

export const onGetAllCampaigns = async (id: string) => {
  try {
    const campaigns = await client.user.findUnique({
      where: {
        clerkId: id,
      },
      select: {
        campaign: {
          select: {
            name: true,
            id: true,
            customers: true,
            createdAt: true,
          },
        },
      },
    })

    if (campaigns) {
      return campaigns
    }
  } catch (error) {
    console.log(error)
  }
}

export const onCreateMarketingCampaign = async (name: string, selectedContacts: string[] = []) => {
  try {
    const user = await currentUser()
    if (!user) return null

    const campaign = await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        campaign: {
          create: {
            name,
            customers: selectedContacts,
          },
        },
      },
    })

    if (campaign) {
      return { status: 200, message: 'Your campaign was created successfully' }
    }
    return { status: 400, message: 'Failed to create campaign' }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'An error occurred while creating the campaign' }
  }
}

export const onSaveEmailTemplate = async (
  template: string,
  campaignId: string
) => {
  try {
    if (!campaignId) {
      return { status: 400, message: 'Campaign ID is required' };
    }

    // Check if campaign exists
    const campaign = await client.campaign.findUnique({
      where: { id: campaignId },
      select: { id: true }
    });

    if (!campaign) {
      return { status: 404, message: 'Campaign not found' };
    }

    // Store template as is, without additional JSON.stringify
    const newTemplate = await client.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        template,
      },
      select: {
        id: true,
        name: true
      }
    });

    if (newTemplate) {
      return { status: 200, message: 'Email template saved successfully' };
    } else {
      return { status: 400, message: 'Failed to save email template' };
    }
  } catch (error) {
    console.error("Error saving email template:", error);
    return { status: 500, message: 'An error occurred while saving the template' };
  }
}

export const onAddCustomersToEmail = async (
  customers: string[],
  id: string
) => {
  try {
    console.log(customers, id)
    const customerAdd = await client.campaign.update({
      where: {
        id,
      },
      data: {
        customers,
      },
    })

    if (customerAdd) {
      return { status: 200, message: 'Customer added to campaign' }
    }
    return { status: 400, message: 'Failed to add customers to campaign' }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'An error occurred while adding customers to campaign' }
  }
}

export const onBulkMailer = async (email: string[], campaignId: string) => {
  try {
    const user = await currentUser()
    if (!user) return { status: 401, message: 'Unauthorized' }

    // Get the template for this campaign
    const template = await client.campaign.findUnique({
      where: {
        id: campaignId,
      },
      select: {
        name: true,
        template: true,
      },
    })

    if (!template) {
      return { status: 404, message: 'Campaign not found' }
    }

    if (!template.template) {
      return { status: 400, message: 'No email template found for this campaign' }
    }

    // Parse the template content
    let htmlContent;
    try {
      // Try to parse as JSON first
      htmlContent = JSON.parse(template.template);
    } catch (e) {
      // If not valid JSON, use as-is
      htmlContent = template.template;
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
      },
    })

    // Set up email options
    const mailOptions = {
      from: process.env.NODE_MAILER_EMAIL,
      to: email,
      subject: template.name || 'Your Email Campaign',
      html: htmlContent,
    }

    // Send email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      
      // Decrement credits
      const creditsUsed = await client.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          subscription: {
            update: {
              credits: { decrement: email.length },
            },
          },
        },
      });
      
      if (creditsUsed) {
        return { status: 200, message: 'Campaign emails sent successfully' };
      } else {
        return { status: 400, message: 'Failed to update credits' };
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return { 
        status: 500, 
        message: 'Failed to send emails. Please check your email configuration.' 
      };
    }
  } catch (error) {
    console.error("Bulk mailer error:", error);
    return { 
      status: 500, 
      message: 'An error occurred while sending emails' 
    };
  }
}

export const onGetAllCustomerResponses = async (id: string) => {
  try {
    const user = await currentUser()
    if (!user) return null
    const answers = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        domains: {
          select: {
            customer: {
              select: {
                questions: {
                  where: {
                    customerId: id,
                    answered: {
                      not: null,
                    },
                  },
                  select: {
                    question: true,
                    answered: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (answers) {
      return answers.domains
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetEmailTemplate = async (id: string) => {
  try {
    const template = await client.campaign.findUnique({
      where: {
        id,
      },
      select: {
        template: true,
      },
    });

    if (template && template.template) {
      return template.template;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const onDeleteCampaign = async (id: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: 'Unauthorized' };

    // Check if campaign exists
    const campaign = await client.campaign.findUnique({
      where: { id },
      select: { 
        id: true,
        name: true 
      }
    });

    if (!campaign) {
      return { status: 404, message: 'Campaign not found' };
    }

    // Delete the campaign
    await client.campaign.delete({
      where: { id },
    });

    return { status: 200, message: 'Campaign deleted successfully' };
  } catch (error) {
    console.log(error);
    return { status: 500, message: 'An error occurred while deleting the campaign' };
  }
};

export const onDuplicateCampaign = async (id: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: 'Unauthorized' };

    // Find the campaign to duplicate
    const existingCampaign = await client.campaign.findUnique({
      where: { id },
      select: { 
        name: true,
        customers: true,
        template: true
      }
    });

    if (!existingCampaign) {
      return { status: 404, message: 'Campaign not found' };
    }

    // Create a new campaign with the same data
    const duplicatedCampaign = await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        campaign: {
          create: {
            name: `${existingCampaign.name} (Copy)`,
            customers: existingCampaign.customers,
            template: existingCampaign.template,
          },
        },
      },
    });

    if (duplicatedCampaign) {
      return { status: 200, message: 'Campaign duplicated successfully' };
    }
    
    return { status: 400, message: 'Failed to duplicate campaign' };
  } catch (error) {
    console.log(error);
    return { status: 500, message: 'An error occurred while duplicating the campaign' };
  }
};
